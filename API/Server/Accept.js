"use strict"
// 服务入口 接收CQP 的上报消息 以及其他指令

var http = require('http')
// var log = require('../LogsIO')


// 是否开启单元测试模式，开启后单元可独立测试
const UNIT_TEST_MODE = true

class Accept {
  constructor() {

    // HTTP服务
    http.createServer(function (req, res) {
      var content = ""

      req.on('data', function (chunk) {
        content += chunk
      })
      req.on('end', function () {
        res.writeHead(200, { "Content-Type": "text/plain" })

        //接收传入的数据并显示
        console.log(content)

        var userid = JSON.parse(content)
        console.log(userid.self_id)

        // 信息传入
        


        res.end()
      })


    }).listen(5000)
  }
}


if (UNIT_TEST_MODE) {

  const accept = new Accept()

} 