const axios = require('axios');
const predictit = require('predict-it');

const getAll = new Promise((resolve, reject) => {
  const markets = predictit.all();
  resolve(markets);
})


getAll.then((markets) => {
  console.log(markets.length)
  markets.forEach((market) => {
    market.Contracts.forEach((c) => {
      const attr =  {
        dateEnd: c.DateEnd,
        open: c.Status == 'Open'
      }
      const price = {
        date: new Date(),
        lastTradePrice: c.LastTradePrice,
        bestBuyYesCost: c.BestBuyYesCost,
        bestBuyNoCost: c.BestBuyNoCost,
        bestSellYesCost: c.BestSellYesCost,
        bestSellNoCost: c.BestSellNoCost
      }
      setTimeout(() => {
        axios.put(`https://predictit-history.firebaseio.com/${market.ID}/${c.ID}.json`, attr,
          { params: { auth: process.env.firebase } }).then(() => {
          axios.post(`https://predictit-history.firebaseio.com/${market.ID}/${c.ID}/prices.json`, price,
          { params: { auth: process.env.firebase } });
        });
      }, Math.random()*40000);

    });
  });
});
