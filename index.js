require('dotenv').config();
const moment = require("moment");
const { getEnabledCategories } = require('trace_events');
const getAccount = require('./lib/account');
const {getAsset, buyAsset, sellAsset, getBars} = require('./lib/orders');

const init = async () => {
    const acc = await getAccount();
    buying_power = acc.buying_power;
    cash = acc.cash;
    long_market_value = acc.long_market_value;
    value = parseInt(cash) + parseInt(long_market_value);
    console.log('Buying power = ' + buying_power + ' cash = ' + cash + ' long market value = ' + long_market_value);
    console.log('equity = '+ value);
    const start = async () => {
        try {
        // const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX', 'TSLA', 'MFST', 'NVDA', 'GOOG', 'VOX', 'VZ'];
        const tickers = ['AAPL', 'AMD', 'SOFI', 'XLNX'];
        for (var i = 0; i < tickers.length; i++) {
            var asset = await getAsset(tickers[i]);
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
        var staged = [];
        var bars = [];
        for (var tick of tickers) {
            bars = [];
            for (var daysAgo = 0; daysAgo < 30; daysAgo++) {
                let start =  moment().subtract(daysAgo+1, "days").format();
                let end = moment().subtract(daysAgo, "days").format();
                let bar = await getBars(tick, start, end);
                (bar && bars.push(bar));
            }
            console.log("bars", bars);
            // stage a stock to be purchased when the stock is positive the day before,
            // and the high from the day before is > than the low of two days ago
            // that way the candlestick is growing up and we are buying on continuation
            if (((bars[0].ClosePrice - bars[0].OpenPrice) > 0) && (bars[0].HighPrice >= bars[1].LowPrice)) {
                staged.push(tick);
            }
        }
        console.log(staged);
    } catch(e) {
        console.log(e);
    }
    }
    start();
}
init();
