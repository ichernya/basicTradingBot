require('dotenv').config();
const orders = require('./lib/orders');

const bodyBuy = {
    "qty": 10,
    "side": "buy",
    "type": "market",
    "time_in_force": "gtc"
    };


const bodySell = {
    "qty": 10,
    "side": "buy",
    "type": "market",
    "time_in_force": "gtc"
    };


var buy = function(overBuy){
    console.log("Stocks found to be a buy : ")
    for(stock of overBuy) {
        console.log(stock.ticker);
        bodyBuy["symbol"] = stock.ticker;
        orders.buyAsset(bodyBuy);
    }

}

var sell = function(overSell){
    console.log("Stocks found to be a sell : ")
    for(stock of overSell) {
        console.log(stock.ticker);
        bodySell["symbol"] = stock.ticker;
        orders.sellAsset(bodySell);
    }

}


module.exports = {
    buy,
    sell,
}