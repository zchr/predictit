const express = require('express')
const axios = require('axios')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
})

app.get('/data', function(request, response) {
  return axios.get('https://predictit-history.firebaseio.com/.json',
    { params: { auth: 'QLFxLVukRuEsxWyk1lOINdV0CNQXQ9du4JExPt5f' } })
  .then((d) => {
    response.send(JSON.stringify(d.data));
  })
  .catch(e => console.log(e));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
