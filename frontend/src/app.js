import React from 'react';
import { useState } from 'react';
import './App.css';
var axios = require('axios');



function App() {
    const [account, setAccount] = useState(null);
    function name() {
        var config = {
            method: 'get',
            url: 'https://paper-api.alpaca.markets/v2/account',
            headers: { 
              'APCA-API-KEY-ID': 'PKJW2Q4804K5CRVQL66L', 
              'APCA-API-SECRET-KEY': 'HMAJGMWrIExCx3J0kjB4wQzSrH4WYtjmPh75tbph'
            }
          };
          
        axios(config)
        
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            const data = JSON.stringify(response.data)
            setAccount(data)
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    name()
    return (
        <div id="Title">
            Stock Portfolio
            <div id = "name">
                {account}
                {/* {account.buying_power}
                {account.cash}
                {account.long_market_value} */}
            </div>
        </div>
    );
    
}

export default App;