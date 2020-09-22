// 服务入口 接收CQP 的上报消息 并转换为 API指令传入

const path = require('path')
const http = require('http')
const transfer = require('./transfer')
const Logger = require('../helpers/logger')
const config = require("./config")

const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')


//服务端口
const MI_PORT = config.server.MI_PORT

class Mirai_Accept {
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

        // var message_data = JSON.parse(content)


        res.end()
      })


    }).listen(MI_PORT)
  }
}


const accept = new Mirai_Accept()
logger.info(`Mirai_Accept is running on port ${MI_PORT}`)