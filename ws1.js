const express = require('express');
const cors = require('cors')
//const tools = require('./tools')
const app = express();
var expressWs = require('express-ws')(app);
const port = 5053;
const dev_key = "12345";

app.use(cors())
app.set('view engine', 'ejs');

//app.get('/ws1/player/', function (req, res, next) {
//    res.render('pages/index');
//});

app.ws('/ws1/jpeg/', function (ws, req) {
    ws.on('message', function (msg) {
        let data = JSON.parse(msg)
        console.log(data)
	ws.send(JSON.stringify(data))
    });
});

app.listen(port);
console.log('Webserver running on port : ' + port);
