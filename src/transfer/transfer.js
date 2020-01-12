class Transfer {

    constructor(app, self_id, user_id, message_type, group_id, message) {

        this.message = message
        // this.command = message.substr(0,1)
        // this.command = message.substr(0,1) 
    }
    get REmessage() {
        if (this.message == "喵一言") {
            return this.Hitokoto()
        }else{
            
        }
    }

    Hitokoto() {
        const http = require('http')

        //get 请求核心服务
        http.get('http://127.0.0.1:3600/api/v1/hitokoto', function (req, res) {
            var content = ''
            req.on('data', function (data) {
                content += data
            })
            req.on('end', function () {
                // console.info(content)
                var message_data = JSON.parse(content)

                var REdata = message_data.data

                console.info(REdata.hitokoto)
            })

            // return REdata

        //向KQ返回数据
        })


        return "Hitokoto success"

    }
    EorzeaWeather() {
        return "this.getEorzeaWeather()"

    }


}

const accept = new Transfer("KQ_Accept", "1034614154", "message_data.user_id", "message_data.message_type", "message_data.group_id", "喵一言")

console.log(accept.REmessage)


