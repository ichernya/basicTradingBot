require('dotenv').config();
const moment = require("moment");
const orders = require('./lib/orders');
const servers = require('./server.js');
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


var buy = async function(overBuy){
    console.log("Stocks found to be a buy : ")
    var bars = [];
    for(stock of overBuy) {
        bars = [];
        for (var daysAgo = 0; daysAgo < 1; daysAgo++) {
            let start =  moment().subtract(daysAgo+1, "days").format();
            let end = moment().subtract(daysAgo, "days").format();
            let bar = await orders.getBars(stock, start, end);
            (bar && bars.push(bar));
        }
        if (bars[0].LowPrice > bars[1].LowPrice) {
            console.log(stock.ticker);
            bodyBuy["symbol"] = stock.ticker;
            orders.buyAsset(bodyBuy);
        }
        else {
            //overbuy
        }
        
    }
    servers.dropFromStagedBuy();

}

var sell = async function(overSell){
    console.log("Stocks found to be a sell : ")
    for(stock of overSell) {
        bars = [];
        for (var daysAgo = 0; daysAgo < 1; daysAgo++) {
            let start =  moment().subtract(daysAgo+1, "days").format();
            let end = moment().subtract(daysAgo, "days").format();
            let bar = await orders.getBars(stock, start, end);
            (bar && bars.push(bar));
        }
        if (bars[0].HighPrice < bars[1].HighPrice) {
            console.log(stock.ticker);
            bodySell["symbol"] = stock.ticker;
            orders.sellAsset(bodySell);
        }
        
    }
    servers.dropFromStagedSell();
}


module.exports = {
    buy,
    sell,
}