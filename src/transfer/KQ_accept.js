// 服务入口 接收CQP 的上报消息 并转换为 API指令传入

const path = require('path')
const http = require('http')
const transfer = require('./transfer')
const Logger = require('../helpers/logger')
const config = require("./config")

const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')


//核心服务端口
const KQ_PORT = config.server.KQ_PORT

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
        // console.log(content)

        var message_data = JSON.parse(content)


        // 如果传入的内容为消息
        if (message_data.post_type === "message") {
          //格式化字符串，替换换行字符
          message_data.message = message_data.message.replace(/[\r]/g, " /r ");
          message_data.message = message_data.message.replace(/[\n]/g, " /n ");

          // 如果传入的消息为通知
        } else if (message_data.post_type === "notice") {

          // 直接将通知内容转为消息传入
          message_data.message = message_data.notice_type

          //临时方案 ，采用group方式传入，后续需要重构
          message_data.message_type = "group"

          //如果传入的消息为好友请求/加群请求
        } else if (message_data.post_type === "request") {



          // 直接将通知内容转为消息传入
          message_data.message == message_data.request_type
        } else {

          message_data.message = "未定义消息类型"

        }


        // 获取KQ回传的机器人id、 发送者id、  消息类型、     群组id（若有）、消息内容
        //            self_id,  user_id,   message_type,  group_id,      message
        console.log("<-- " + message_data.user_id + " < " + message_data.message_type + " --< " + message_data.message)

        //消息日志记录
        logger.info(`KQ_Accept - Accept - BOOTID:${message_data.self_id} UID:${message_data.user_id} message: ${message_data.message}`)

        //回复消息处理
        //群消息处理
        if (message_data.message_type == "group" || message_data.message_type == "private") {
          if (message_data.message_type != "group") {
            message_data.group_id = "none"
          }

          //消息传入语言处理单元
          const getTransfer = new transfer("KQ_Accept", message_data.post_type, message_data.self_id, message_data.user_id, message_data.message_type, message_data.group_id, message_data.message)

             getTransfer.REmessage.then(function (value) {
            if (value !== 0) {

              //返回值操作
              //判断回传的消息回复类型
              if (value.re_type == "group") {

                //发送给KQ-api的 路径
                var RErouter = "/send_group_msg"

                //返回信息内容
                var REbody = {
                  "group_id": value.re_id,
                  "message": value.re_message
                }

              } else if (value.re_type == "private") {

                //发送给KQ-api的 路径
                var RErouter = "/send_private_msg"

                //返回信息内容
                var REbody = {
                  "user_id": value.re_id,
                  "message": value.re_message
                }
              }

              // logger.info(message_data.group_id + "///" +value.re_id + "///" +value.re_type + "///" + value.re_message )

              //格式化
              REbody = JSON.stringify(REbody)

              //http post参数
              var REmessageOptions = {
                host: '192.168.199.100',
                port: 5700,
                path: RErouter,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': REbody.length
                }
              }

              //格式化字符串，替换换行字符 输出日志
              value.re_message = value.re_message.replace(/[\r]/g, "\r");
              value.re_message = value.re_message.replace(/[\n]/g, "\n" + "--> ")
              console.log("--> " + value.re_message + ">" + value.re_id)

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
                  console.log("--> status: " + content.status + " message_id: " + content.data.message_id + " retcode: " + content.retcode)
                })
                req.on('error', function (err) {
                  // handle error.
                  console.log("--> " + err)
                })
              })
              req.write(REbody)
              req.end()
            }
          })
        }
        //未知消息 
        else {
          console.log("消息类型未知")
        }
        res.end()
      })


    }).listen(KQ_PORT)
  }
}


const accept = new KQ_Accept()
logger.info(`KQ_Accept is running on port ${KQ_PORT}`)