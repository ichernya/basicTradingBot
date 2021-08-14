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
        const symbols = ['AAPL', 'AMD', 'SOFI', 'XLNX', 'TSLA', 'MFST', 'NVDA', 'GOOG', 'VOX', 'VZ'];
        for (var i = 0; i < symbols.length; i++) {
            var asset = await getAsset(symbols[i]);
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
        for (var j of symbols) {
            const tick = j;
            var price = [];
            var high = [];
            var low = [];
            var time = [];
            for (var i = 0; i < 30; i++) {
                await getBars( 
                                tick,
                                moment().subtract(i+1, "days").format(),
                                moment().subtract(i, "days").format(),
                                i,
                                time,
                                price,
                                high,
                                low,
                            )
            }
            console.log(time);
            console.log(price);
            console.log(high);
            console.log(low);
            // stage a stock to be purchased when the stock is positive the day before,
            // and the high from the day before is > than the low of two days ago
            // that way the candlestick is growing up and we are buying on continuation
            if (price[0] > 0 && (high[0] >= low[1])) {
                staged.push(tick);
            }
            
        }
        console.log(staged);
    }

    start();
}
init();