// 服务入口  接收Mirai 的 ws 消息 并转换为 API指令传入

// 开发中


const path = require('path')
const Logger = require('../helpers/logger')
const config = require("./config")

// const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')

const WebSocket = require('ws');
const transfer = require('./transfer')
const server = config.server.host + ":" + config.server.port
const ServerHost = "http://" + server

const ws = new WebSocket('ws://' + server + '/all?sessionKey=' + config.server.MI_SKey)

const sendMSGurl = ServerHost + "/sendGroupMessage"

ws.onopen = () => {
    console.log('WebSocket onopen')
}

ws.onmessage = e => {

    var post_type, message, user_id, group_id, message_type
    // console.log('WebSocket message received：', e)
    console.log('WebSocket data received：', e.data)
    var receivedData = JSON.parse(e.data)
    var self_id = "1304665612"
    var request = require('request')
    if (receivedData.type == "GroupMessage") {

        if (receivedData.messageChain[1].type === "Plain") {
            post_type = "message"
            message_type = "group"
            message = receivedData.messageChain[1].text
            user_id = receivedData.sender.id
            group_id = receivedData.sender.group.id
        } else {
            post_type = "message"
            message_type = "group"
            message = "none"
            user_id = receivedData.sender.id
            group_id = receivedData.sender.group.id
        }

    }
    else if (receivedData.type == "FriendMessage") {
        post_type = "message"
        message = receivedData.messageChain[1].text
        message_type = "private"
        user_id = receivedData.sender.id
        group_id = "none"
    }
    else if (receivedData.type == "MemberJoinEvent") {
        post_type = "notice"
        message = "group_increase"
        message_type = "group"
        user_id = receivedData.member.id
        group_id = receivedData.member.group.id

    } else {
        post_type = "message"
        message_type = "group"
        message = "group_increase"
        user_id = "member.id"
        group_id = "member.group.id"
      
    }
    console.log(receivedData)

    //消息传入语言处理单元
    const getTransfer = new transfer("Mia_Accept", post_type, self_id, user_id, message_type, group_id, message)

    ////// getTransfer.REmessage//////////
    getTransfer.REmessage.then(function (value) {

        if (value !== 0) {

            //返回值
            if (value.re_type == "group") {
                if (value.is_image) {
                    var REbody = {
                        sessionKey: config.server.MI_SKey,
                        target: value.re_id,
                        messageChain: [{
                            "type": "Image",
                            "url": value.re_message
                        }]

                    }
                } else {
                    //返回信息内容
                    var REbody = {
                        sessionKey: config.server.MI_SKey,
                        target: value.re_id,
                        messageChain: [{
                            "type": "Plain",
                            "text": value.re_message
                        }]
                    }
                    console.log("REbody:",REbody)
                }
            }
            ////////verifyRequestData/////////
            var verifyRequestData = {
                sessionKey: config.server.MI_SKey,
                target: REbody.group_id,
                messageChain: [
                    {
                        "type": "Plain",
                        "text": REbody.message
                    }
                ]

            }
            /////////request////////
            request({
                url: sendMSGurl,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: REbody
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // 请求成功
                    console.log(body)
                    console.log(body.msg)
                }
            })
            //////////request///////////
        }
        /////////if/////////////
    })
    ////// getTransfer.REmessage//////////

}

ws.onclose = e => {
    console.log("WebSocket onclose")
}
