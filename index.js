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
        const symbols = ['AAPL', 'AMD', 'SOFI', 'XLNX'];
        for (var i = 0; i < symbols.length; i++) {
            var asset = await getAsset(symbols[i]);
            console.log(asset);
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
        
        //await sellAsset(body);

        // {symbol, start, end}
        //start is market open
        //end is market close
        // returns the opening and closing for every minute between two days
        // const symbol = 'AAPL';
        // for (var i = 0; i<30;i++){
        //     var start = moment().subtract(i, "minutes").format();
        //     var end = moment().subtract(i, "days").format();
        //     var bars = await getBars({symbol, start, end});
        //     console.log('bars', bars);

        // }

        for (var i = 0; i < 30; i++) {
            await getBars( 
                            moment().subtract(i+1, "days").format(),
                            moment().subtract(i, "days").format(),
                            i,
                         )
        }
    }
    start();
}
init();