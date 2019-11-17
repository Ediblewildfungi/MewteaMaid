var http = require('http');
var dt = require('./test.js')

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(5000);

console.log("The date and time are currently: " + dt.myDateTime());
console.log('正在运行...');