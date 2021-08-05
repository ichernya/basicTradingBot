const fetch = require('node-fetch');

const getAccount = async () => {
    try {
        const res = await fetch(` https://paper-api.alpaca.markets/v2/account `,
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

module.exports = getAccount;