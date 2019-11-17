"use strict"
// 服务入口 接收CQP 的上报消息 以及其他指令
//

var http = require('http');


// HTTP服务
http.createServer(function (req, res) {
  var content = "";

  req.on('data', function (chunk) {
    content += chunk;
  });

  req.on('end', function () {
    res.writeHead(200, {"Content-Type": "text/plain"});
    
    console.log(content)

    var userid = JSON.parse(content)

    console.log(userid.self_id)

    // 信息传入


    res.end();
  });

}).listen(5000);


