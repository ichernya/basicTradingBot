const fetch = require('node-fetch');
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca();

const getAsset = async (ticker) => {
    try {
        const res = await fetch(` https://paper-api.alpaca.markets/v2/assets/${ticker}`,
        {
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        return await res.json();
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
        return await res.json();
    } catch(e) {
        console.log(e);
    }
}

const sellAsset = async (body) => {
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
        return await res.json();
    } catch(e) {
        console.log(e);
    }
}

const getBars = async (tick, start, end) => {
    try {
        const bar = await alpaca.getBarsV2(
            tick,
            {
                start: start,
                end: end,
                timeframe: "1Day",
            },
            alpaca.configuration
        );
        for await (b of bar){
            return b;
        }
    } catch (e) {
        console.log("It's a weekend");
    }
}
// const getBars = async ({symbol, start, end}) => {
//     try {
//         const resp = await fetch(`https://data.alpaca.markets/v1/bars/minute?symbols=${symbol}&start=${start}&end=${end}`, {
//             headers: {
//                 'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
//                 'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
//             }
//         });
//         return resp.json();
//     } catch (e) {
//         console.log(e);
//     }
// }

module.exports = {getAsset, buyAsset, sellAsset, getBars};
