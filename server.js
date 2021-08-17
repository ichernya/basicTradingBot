var mongoose = require('mongoose');
const dbUser = process.env.MONGO_USER
const dbPass = process.env.MONGO_PASS
const logIn = dbUser + ":" + dbPass;
const uri = "mongodb+srv://admin:3n9anyC62Q5szyQZ@cluster0.0nhqc.mongodb.net/ProjectNew?retryWrites=true&w=majority";

async function connectMongo() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected");
    } catch(e) {
        console.log(e);
    } finally {
        console.log("Finally");
    }
}

const barSchema = new mongoose.Schema({
    timePosted: Date,
    timeFormat: String,
    daysAgo: Number,
    title: String,
    address: String,
    price: String,
    specs: String,
    url: String
  });



connectMongo();