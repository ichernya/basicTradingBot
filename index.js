require('dotenv').config();
const moment = require("moment");
const { getEnabledCategories } = require('trace_events');
const account = require('./lib/account');
const orders = require('./lib/orders');
const server = require('./server.js');
const moves = require('./moves.js');



// const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX', 'TSLA', 'MFST', 'NVDA', 'GOOG', 'VOX', 'VZ'];
const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX', 'TSLA', 'NVDA', 'GOOG', 'VOX', 'VZ']; // Stocks that are to be examined
const init = async () => {
    // returns basic information about the account
    const account_positions = await account.getPosistion()
    const acc = await account.getAccount();
    console.log('Buying power = ' + acc.buying_power + ' cash = ' + acc.cash + ' long market value = ' + acc.long_market_value);
    console.log('equity = ' + parseInt(acc.cash) + parseInt(acc.long_market_value));
    // overBuy and overSell are the staged buy and sell stocks from the day before
    // these stocks will be examined after market closes the day after they are staged
    // stocks 24 hours after staging are either bought, sold, or removed from staging
    const overBuy = await server.pullFromStagedBuy();
    const overSell = await server.pullFromStagedSell();
    console.log("overBuy : " + overBuy);
    console.log("overSell : " + overSell);
    moves.buy(overBuy);
    moves.sell(overSell);
    const start = async () => {
        try {
            for (var i = 0; i < tickers.length; i++) {
                var asset = await orders.getAsset(tickers[i]);
                //console.log(asset);
            }
            // loops throught the bars of a stock over the period of the last 7 days
            // this allows us to have candlestick data and trends for the stock to examine
            var staged_buy = [];
            var staged_sell = [];
            var bars = [];
            for (var tick of tickers) {
                bars = [];
                for (var daysAgo = 0; daysAgo < 7; daysAgo++) {
                    let start =  moment().subtract(daysAgo+1, "days").format();
                    let end = moment().subtract(daysAgo, "days").format();
                    let bar = await orders.getBars(tick, start, end);
                    (bar && bars.push(bar));
                }
            // stage a stock to be purchased when the stock is positive the day before,
            // and the high from the day before is > than the low of two days ago
            // that way the candlestick is growing up and we are buying on continuation
            if (((bars[0].ClosePrice - bars[0].OpenPrice) > 0) && (bars[0].HighPrice >= bars[1].LowPrice)) {
                staged_buy.push(tick);
                var found = false
                for (stock of overBuy) {
                    if (stock.ticker == tick) {
                        console.log("duplicate");
                        found = true;
                        break
                    }
                }
                if (!found) {server.addToStageBuy(tick);}
            }
            if (((bars[0].ClosePrice - bars[0].OpenPrice) < 0) && (bars[0].LowPrice <= bars[1].HighPrice)) {
                staged_sell.push(tick);
                var found = false
                for (stock of overSell) {
                    if (stock.ticker == tick) {
                        console.log("duplicate");
                        found = true;
                        break
                    }
                }
                if (!found) {server.addToStageSell(tick);}
            }
        }

        console.log("Staged to sell: " + staged_sell);
        console.log("Staged to buy: " + staged_buy);
        for (var stock of account_positions) {
            if (stock.symbol in staged_sell) {
                console.log(stock);
            }
        }
        } catch(e) {
            console.log(e);
        }
    }
    start();
}
init();
