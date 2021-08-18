require('dotenv').config();
const moment = require("moment");
const { getEnabledCategories } = require('trace_events');
const account = require('./lib/account');
const orders = require('./lib/orders');
const {buy, sell, addToStageSell, addToStageBuy} = require('./server.js')

const init = async () => {
    const account_positions = await account.getPosistion()
    const acc = await account.getAccount();
    buying_power = acc.buying_power;
    cash = acc.cash;
    long_market_value = acc.long_market_value;
    value = parseInt(cash) + parseInt(long_market_value);
    console.log('Buying power = ' + buying_power + ' cash = ' + cash + ' long market value = ' + long_market_value);
    console.log('equity = '+ value);
    console.log(buy);
    console.log(sell);
    const start = async () => {
        try {
        // const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX', 'TSLA', 'MFST', 'NVDA', 'GOOG', 'VOX', 'VZ'];
        const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX'];
        for (var i = 0; i < tickers.length; i++) {
            var asset = await orders.getAsset(tickers[i]);
            //console.log(asset);
        }
        bodyBuy = {
            "symbol": "AAPL",
            "qty": 1,
            "side": "buy",
            "type": "market",
            "time_in_force": "day"
            };

        //await buyAsset(body);

        bodySell = {
            "symbol": "AAPL",
            "qty": 1,
            "side": "buy",
            "type": "market",
            "time_in_force": "day"
            };

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
                addToStageBuy(tick);
            }
            if (((bars[0].ClosePrice - bars[0].OpenPrice) < 0) && (bars[0].LowPrice <= bars[1].HighPrice)) {
                staged_sell.push(tick);
                addToStageSell(tick);
            }
        }
        console.log("Staged to sell: " + staged_sell);
        console.log("Staged to buy: " + staged_buy);
        console.log("Staged to sell && able to sell:")
        for (var stock of account_positions) {
            if (stock.symbol in staged_sell) {
                console.log(stock);
            }
        }


        // price of stock in real time ==
        // for (var tick of staged_buy) {
        //     let todayStart = moment().subtract(1, "days").format();
        //     let todayEnd = moment().subtract(0, "days").format();
        //     let yesterdayStart = moment().subtract(2, "days").format();
        //     let yesterdayEnd = moment().subtract(1, "days").format();
        //     let todayBar = await orders.getBars(tick, todayStart, todayEnd);
        //     let yesterdayBar = await orders.getBars(tick, yesterdayStart, yesterdayEnd);
        //     let ninetyFivePercent = Math.floor(buying_power * 0.95);
        //     if(todayBar.LowPrice > yesterdayBar.LowPrice) {
        //         while(buying_power > ninetyFivePercent)
        //     }
        // }
        // for (var position of positions) {
        //
        // }
        //console.log(staged_buy);
    } catch(e) {
        console.log(e);
    }
    }
    start();
}
init();
