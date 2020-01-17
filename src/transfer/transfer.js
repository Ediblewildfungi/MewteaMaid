const http = require('http')
const querystring = require("querystring")
//核心服务版本以及请求地址
const KernelSrc = "http://127.0.0.1:3000/api/v1/"

//一言请求地址
const HitokotoSrc = KernelSrc + "hitokoto"

//暖暖请求地址
const NuannuanSrc = KernelSrc + "ffxiv/fashionReport"

//艾欧泽亚天气请求地址
const EorzeaWeatherSrc = KernelSrc + "ffxiv/weather"

//输入处理
const transfer = class Transfer {

    constructor(app, self_id, user_id, message_type, group_id, message) {

        this.message = message
        this.messageArr = this.message.split(/\s+/)
    }
    get REmessage() {
        if (this.message == "喵一言") {
            return this.Hitokoto()
        } else if (this.message == "喵暖暖") {
            return this.Nuannuan()
        } else if (this.message.substring(0, 3) == "喵天气") {
            return this.EorzeaWeather(this.messageArr)
        } else if (this.message == "喵音乐会") {
            return this.OtherMessage()
        } else if (this.message == "喵输出") {
            return this.OtherMessage()
        } else if (this.message == "喵预留1") {
            return this.OtherMessage()
        } else if (this.message == "喵预留2") {
            return this.OtherMessage()
        } else {
            return this.OtherMessage()
        }

    }

    //一言处理
    Hitokoto() {
        const HitokotoHttp = new Promise(function (resolve, reject) {
            //get 请求核心服务
            http.get(HitokotoSrc, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var hitokoto_data = JSON.parse(content)
                    var REdata = hitokoto_data.data

                    //输出一言与来源
                    var REdata = REdata.hitokoto + "\r\n" + "————" + REdata.from
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return HitokotoHttp
    }
    Nuannuan() {
        const NuannuanHttp = new Promise(function (resolve, reject) {
            //get 请求核心服务
            http.get(NuannuanSrc, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var nuanuan_data = JSON.parse(content)
                    var REdata = nuanuan_data.data
                    var REdata = REdata.update + "\r\n" + REdata.answer
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return NuannuanHttp

    }

    //天气查询处理
    EorzeaWeather(messageArr) {
        const EorzeaWeatherHttp = new Promise(function (resolve, reject) {
            console.log(messageArr[1])
            var Address = messageArr[1]
            var SrcAddAddress = EorzeaWeatherSrc + "?areaName="+ Address
            //get 请求核心服务
            http.get(SrcAddAddress, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var EorzeaWeather_data = JSON.parse(content)
                    var REdata = EorzeaWeather_data.data

                    var REdata = REdata[0].weather


                    resolve(REdata)
                })
            })
        })
        //返回函数
        return EorzeaWeatherHttp

    }
    //意外的输入
    OtherMessage() {
        // const aSrc = "http://127.0.0.1:3000/api/v1/hitokoto?c=a"
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