const fetch = require('node-fetch');

const getAsset = async (ticker) => {
    try {
        const res = await fetch(` https://paper-api.alpaca.markets/v2/assets/${ticker}`,
        {
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        return res.json();
    } catch(e) {
        console.log(e);
    }
}

const buyAsset = async (body) => {
    try {
        const res = await fetch(`https://paper-api.alpaca.markets/v2/orders`,
        {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        return res.json();
    } catch(e) {
        console.log(e);
    }
}
module.exports = {getAsset, buyAsset};