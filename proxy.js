var http = require('http'),
  httpProxy = require('http-proxy'),
  express = require('express');
const cors = require('cors')

// create a server
var app = express();
app.use(cors())

var proxyWeb1 = httpProxy.createProxyServer({ target: 'http://localhost:5053', ws: true }); // web service 1
var proxyWeb2 = httpProxy.createProxyServer({ target: 'http://localhost:5054', ws: true }); // web service 2
var server = require('http').createServer(app);


// proxy HTTP GET / POST
app.all('/ws1/*', function (req, res) {
  console.log("proxi web radar request", req.url);
  proxyWeb1.web(req, res, {});
});

// proxy HTTP GET / POST
app.all('/ws2/*', function (req, res) {
  console.log("proxying GET request", req.url);
  proxyWeb2.web(req, res, {});
});

// Proxy websockets
server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  if (req.url == '/ws1/jpeg/') proxyWeb1.ws(req, socket, head);
  if (req.url == '/ws2/jpeg/') proxyWeb2.ws(req, socket, head);
});

server.listen(9090);