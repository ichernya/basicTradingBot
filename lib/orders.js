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
        console.log(ticker + "Is not Owned");
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

const potentialUptrend = (bars) => {
    const price_change_today = bars[0].ClosePrice - bars[0].OpenPrice;
    const price_change_ratio_today = price_change_today / bars[0].OpenPrice;
    const price_change_yesterday = bars[1].ClosePrice - bars[1].OpenPrice;
    let price_change_five_days = 0;
    let negative_days = 0;
    let positive_days = 0;
    for (daysAgo = 0; daysAgo < bars.length; daysAgo++) {
        price_change = bars[daysAgo].ClosePrice - bars[daysAgo].OpenPrice;
        price_change_five_days += price_change;
        price_change > 0 ? positive_days++ : negative_days++;
    }
    if (Math.abs(price_change_ratio_today) < 0.005 && price_change_yesterday < 0 && price_change_five_days < 0 && negative_days > positive_days) {
        return true;
    } else {
        return false;
    }
}

const potentialDowntrend = (bars) => {
    const price_change_today = bars[0].ClosePrice - bars[0].OpenPrice;
    const price_change_ratio_today = price_change_today / bars[0].OpenPrice;
    const price_change_yesterday = bars[1].ClosePrice - bars[1].OpenPrice;
    let price_change_five_days = 0;
    let negative_days = 0;
    let positive_days = 0;
    for (daysAgo = 0; daysAgo < bars.length; daysAgo++) {
        price_change = bars[daysAgo].ClosePrice - bars[daysAgo].OpenPrice;
        price_change_five_days += price_change;
        price_change > 0 ? positive_days++ : negative_days++;
    }
    if (Math.abs(price_change_ratio_today) < 0.005 && price_change_yesterday > 0 && price_change_five_days > 0 && negative_days < positive_days) {
        return true;
    } else {
        return false;
    }
}

const getPrice = async ({symbol, start, end}) => {
    try {
        const resp = await fetch(` https://data.alpaca.markets/v1/bars/minute?symbols=${symbol}&start=${start}&end=${end}`, {
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        return resp.json();
    } catch (e) {
        console.log(e);
    }
}

const getLastQuote = async (symbol) => {
    try {
        const resp = await fetch(` https://data.alpaca.markets/v1/last_quote/stocks/${symbol}`, {
            headers: {
                'APCA-API-KEY-ID': process.env.APCA_API_KEY_ID,
                'APCA-API-SECRET-KEY': process.env.APCA_API_SECRET_KEY
            }
        });
        return resp.json();
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAsset,
    buyAsset,
    sellAsset,
    getBars,
    potentialUptrend,
    potentialDowntrend,
    getPrice,
    getLastQuote,
};
