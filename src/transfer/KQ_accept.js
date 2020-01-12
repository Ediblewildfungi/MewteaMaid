// 服务入口 接收CQP 的上报消息 并转换为 API指令传入

var http = require('http')
var transfer = require('./transfer')

class KQ_Accept {
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

        var message_data = JSON.parse(content)

        // 获取KQ回传的机器人id、 发送者id、  消息类型、     群组id（若有）、消息内容
        //            self_id,  user_id,   message_type,  group_id,      message
        console.log(message_data.self_id)
        console.log()

        // 信息传入
        // 前端类型
        // const transfer = new Transfer()
        


        res.end()
      })


    }).listen(5000)
  }
}


const accept = new KQ_Accept()