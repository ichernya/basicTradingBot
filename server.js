var mongoose = require('mongoose');
const dbUser = process.env.MONGO_USER
const dbPass = process.env.MONGO_PASS
const logIn = dbUser + ":" + dbPass;
const uri = "mongodb+srv://admin:3n9anyC62Q5szyQZ@cluster0.0nhqc.mongodb.net/ProjectNew?retryWrites=true&w=majority";

async function connectMongo() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected");
    } catch(e) {
        console.log(e);
    }
}
connectMongo();

const stagedToBuy = new mongoose.Schema({
    ticker: String
})
const Buy = mongoose.model('buy', stagedToBuy);
const stagedToSell = new mongoose.Schema({
    ticker: String
})
const Sell = mongoose.model('sell', stagedToSell);


const addToStageBuy = async (tick) => {
    console.log(tick)
    var buy = Buy();
    buy.ticker = tick;
    console.log(buy)
    await buy.save();
}


const addToStageSell = async (tick) => {
    console.log(tick)
    var sell = Sell();
    sell.ticker = tick;
    console.log(sell)
    await sell.save();
}

const pullFromStagedBuy = async () => {
    const all = await Buy.find({});
    return all;
}

const pullFromStagedSell = async () => {
    const all = await Sell.find({});
    return all;
}

module.exports = {
    addToStageBuy,
    addToStageSell,
    pullFromStagedBuy,
    pullFromStagedSell,
};
