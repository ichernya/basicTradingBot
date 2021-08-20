require('dotenv').config();

var buy = function(overBuy){
    console.log("Stocks found to be a buy :")
    for(stock of overBuy) {
        console.log(stock.ticker);
    }
}

var sell = function(overSell){
    console.log("Stocks found to be a sell :")
    for(stock of overSell) {
        console.log(stock.ticker);
    }
}


module.exports = {
    buy,
    sell,
}