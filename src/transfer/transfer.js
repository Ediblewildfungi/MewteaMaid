const http = require('http')



//输入处理
const transfer = class Transfer {

    constructor(app, self_id, user_id, message_type, group_id, message) {

        this.message = message
        // this.command = message.substr(0,1)
        // this.command = message.substr(0,1) 
    }
    get REmessage() {
        if (this.message == "喵一言") {
            return this.Hitokoto()
        } else {
            return this.OtherMessage()
        }
    }

    //一言处理
    Hitokoto() {
        const aSrc = "http://127.0.0.1:3000/api/v1/hitokoto"
        const HitokotoHttp = new Promise(function (resolve, reject) {
            //get 请求核心服务
            http.get(aSrc, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {
                    // console.info(content)
                    var hitokoto_data = JSON.parse(content)
                    var REdata = hitokoto_data.data
                    // console.info(REdata.hitokoto)
                    // return REdata

                    var REdata = REdata.hitokoto + "\r\n" + "————" + REdata.from

                    resolve(REdata)
                })
            })
        })

        //返回函数
        return HitokotoHttp

    }

    //天气查询处理
    EorzeaWeather() {
        // return "this.getEorzeaWeather()"

    }
    //意外的输入
    OtherMessage() {
        const aSrc = "http://127.0.0.1:3000/api/v1/hitokoto?c=a"
        const OtherMessage = new Promise(function (resolve, reject) {
            //返回0
            resolve(0)
        })

        //返回函数
        return OtherMessage
    }


}


var hitokototest = "00"
// 测试
if (hitokototest == "ture") {

    const accept = new transfer("KQ_Accept", "1034614154", "message_data.user_id", "message_data.message_type", "message_data.group_id", "喵一言")

    // 打印了一个函数
    console.log(accept.REmessage)

    //返回值
    accept.REmessage.then(function (value) {
        console.log(value)

    })
} else {

}



module.exports = transfer