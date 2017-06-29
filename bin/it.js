const axios = require('axios');

axios.get('https://predictit-history.firebaseio-demo.com/')
.then(function (response) {
  console.log(response);
})
