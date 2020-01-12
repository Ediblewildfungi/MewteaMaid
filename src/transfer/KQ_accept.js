// 服务入口 接收CQP 的上报消息 并转换为 API指令传入

const path = require('path')
const http = require('http')
const transfer = require('./transfer')
const Logger = require('../helpers/logger')

const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')

//核心服务端口
const PORT = process.env.PORT || 3600

//酷Q应用服务端口
const KQ_PORT = 5000

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

        //格式化字符串，替换换行字符
        message_data.message = message_data.message.replace(/[\r]/g," /r "); 
        message_data.message = message_data.message.replace(/[\n]/g," /n "); 

        //消息日志记录
        logger.info(`KQ_Accept - Accept - ID:${ message_data.self_id }  message: ${ message_data.message }`)

        //消息处理
        // const transfer = new transfer.Transfer("KQ_Accept",message_data.user_id,message_data.message_type,message_data.group_id,message_data.message)


        


        res.end()
      })


    }).listen(KQ_PORT)
  }
}


const accept = new KQ_Accept()
logger.info(`KQ_Accept is running on port ${ KQ_PORT }`)