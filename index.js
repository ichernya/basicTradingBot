require('dotenv').config();
const getAccount = require('./lib/account');
const {getAsset, buyAsset} = require('./lib/orders');

const init = async () => {
    const acc = await getAccount();
    buying_power = acc.buying_power;
    cash = acc.cash;
    long_market_value = acc.long_market_value;
    console.log('Buying power = ' + buying_power + ' cash = ' + cash + ' long market value = ' + long_market_value);
    const start = async () => {
        const symbol = 'AAPL';
        const asset = await getAsset(symbol);
        console.log(asset);
        body = {
            "symbol": "AAPL",
            "qty": 1,
            "side": "buy",
            "type": "market",
            "time_in_force": "day"
            };
        //await buyAsset(body);
    }
    start();
}
init();