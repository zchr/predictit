const axios = require('axios');
const predictit = require('predict-it');

const getAll = new Promise((resolve, reject) => {
  const markets = predictit.all();
  resolve(markets);
})


getAll.then((markets) => {
  console.log(markets.length)
  markets.forEach((market) => {
    setTimeout(() => {
      const mAttr = {
        name: market.Name,
        link: market.URL
      }

      axios.put(`https://predictit-history.firebaseio.com/${market.ID}/attributes.json`, mAttr,
        { params: { auth: 'QLFxLVukRuEsxWyk1lOINdV0CNQXQ9du4JExPt5f' } });
    }, Math.random()*20000);
    market.Contracts.forEach((c) => {
      const cAttr =  {
        dateEnd: c.DateEnd,
        open: c.Status == 'Open',
        name: c.Name,
        link: market.URL
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
        axios.put(`https://predictit-history.firebaseio.com/${market.ID}/${c.ID}/attributes.json`, cAttr,
          { params: { auth: 'QLFxLVukRuEsxWyk1lOINdV0CNQXQ9du4JExPt5f' } });
        axios.post(`https://predictit-history.firebaseio.com/${market.ID}/${c.ID}/prices.json`, price,
        { params: { auth: 'QLFxLVukRuEsxWyk1lOINdV0CNQXQ9du4JExPt5f' } });
      }, Math.random()*20000);

    });
  });
});
