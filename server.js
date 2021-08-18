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
const ticker = new mongoose.Schema({
    name: String
  });

const stagedToBuy = new mongoose.Schema({
    list: []
})

const stagedToSell = new mongoose.Schema({
    list: []
})
const Buy = mongoose.model('Buy', stagedToBuy);
const buy = new Buy();
const Sell = mongoose.model('Sell', stagedToSell);
const sell = new Sell();

const addToStageBuy = async (tick) => {
    console.log(tick)
    buy.list.push(tick);
    console.log(buy)
    await buy.save();
}


const addToStageSell = async (tick) => {
    console.log(tick)
    sell.list.push(tick);
    console.log(sell)
    await sell.save();
}

console.log(Buy.find());
console.log(Sell.find());

module.exports = {
    buy,
    sell,
    addToStageBuy,
    addToStageSell,
};
