// 服务入口 接收CQP 的上报消息 并转换为 API指令传入

const path = require('path')
const http = require('http')
const transfer = require('./transfer')
const Logger = require('../helpers/logger')

const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')

//核心服务端口
const PORT = process.env.PORT || 3600

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

        //格式化字符串，替换换行字符
        message_data.message = message_data.message.replace(/[\r]/g, " /r ");
        message_data.message = message_data.message.replace(/[\n]/g, " /n ");

        //消息日志记录
        logger.info(`KQ_Accept - Accept - ID:${message_data.self_id}  message: ${message_data.message}`)

        //回复消息处理
        //群消息处理
        if (message_data.message_type == "group") {

          //消息传入语言处理单元
          const getTransfer = new transfer("KQ_Accept", "1034614154", message_data.user_id, message_data.message_type, "message_data.group_id", message_data.message)

          // const transfer2 = new transfer("KQ_Accept", "1034614154", "message_data.user_id", "message_data.message_type", "message_data.group_id", "喵一言")
          getTransfer.REmessage.then(function (value) {
            if (value !== 0) {

              //返回值操作

              //返回信息内容
              var REbody = {
                "group_id": message_data.group_id,
                "message": value
              }

              //格式化
              REbody = JSON.stringify(REbody)

              //http post参数
              var REmessageOptions = {
                host: '192.168.199.100',
                port: 5700,
                path: '/send_group_msg',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': REbody.length
                }
              }
              console.log(value)

              //向CoolQ HTTP发送请求
              var req = http.request(REmessageOptions, function (res) {
                res.setEncoding('utf-8')
                var content = ''
                res.on('data', function (data) {
                  content += data
                })
                res.on('end', function () {

                  //格式化返回参数
                  content = JSON.parse(content)
                  console.log(content)
                })
                req.on('error', function (err) {
                  // handle error.
                  console.log(err)
                })
              })
              req.write(REbody)
              req.end()
            }
          })
        }
        //私聊消息处理 
        else if (message_data.message_type == "private") {
          //消息传入语言处理单元
          const getTransfer = new transfer("KQ_Accept", "1034614154", "message_data.user_id", message_data.message_type, "message_data.group_id", message_data.message)

          // const transfer2 = new transfer("KQ_Accept", "1034614154", "message_data.user_id", "message_data.message_type", "message_data.group_id", "喵一言")
          getTransfer.REmessage.then(function (value) {
            if (value !== 0) {

              //返回值操作

              //返回信息内容
              var REbody = {
                "user_id": message_data.user_id,
                "message": value
              }

              //格式化
              REbody = JSON.stringify(REbody)

              //http post参数
              var REmessageOptions = {
                host: '192.168.199.100',
                port: 5700,
                path: '/send_private_msg',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': REbody.length
                }
              }
              console.log(value)

              //向CoolQ HTTP发送请求
              var req = http.request(REmessageOptions, function (res) {
                res.setEncoding('utf-8')
                var content = ''
                res.on('data', function (data) {
                  content += data
                })
                res.on('end', function () {

                  //格式化返回参数
                  content = JSON.parse(content)
                  console.log(content)
                })
                req.on('error', function (err) {
                  // handle error.
                  console.log(err)
                })
              })
              req.write(REbody)
              req.end()
            }
          })

        } else {
          console.log("消息类型未知")
        }


        res.end()
      })


    }).listen(KQ_PORT)
  }
}


const accept = new KQ_Accept()
logger.info(`KQ_Accept is running on port ${KQ_PORT}`)