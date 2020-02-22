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

//艾欧泽亚天气请求地址
const ConcertSrc = KernelSrc + "ffxiv/concert"


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
            return this.ConcertInfo()
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
                    var REdata = REdata.hitokoto + "\r\n" + "——" + REdata.from
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return HitokotoHttp
    }

    //金蝶暖暖
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
            // console.log(messageArr[1])
            var Address = messageArr[1]
            var Weather = messageArr[2]

            //判断是否存在地区参数，如不存在，返回错误
            if (Address != undefined) {

                //判断是否存在天气参数，若不存在：
                if (Weather == undefined) {
                    var SrcAddAddress = EorzeaWeatherSrc + "?areaName=" + Address

                    //get 请求核心服务
                    http.get(SrcAddAddress, function (req, res) {
                        var content = ''
                        req.on('data', function (data) {
                            content += data
                        })
                        req.on('end', function () {

                            // 格式化返回数据
                            var EorzeaWeather_data = JSON.parse(content)

                            //核心服务返回ok
                            if (EorzeaWeather_data.ok === true) {
                                var REdataJSON = EorzeaWeather_data.data
                                var REdata = Address + "天气情况\r\n"

                                //限制返回数量最多为5条
                                if (REdataJSON.length > 5) {
                                    REdataJSON.length = 5
                                }

                                //字符拼接，根据返回数组长度进行输出
                                for (let i = 0; i < REdataJSON.length; i++) {
                                    REdata += REdataJSON[i].startTime + ":00 " + REdataJSON[i].weather + "\r\n"
                                }

                                //核心服务返回错误信息
                            } else {
                                var REdata = "喵天气：" + EorzeaWeather_data.message
                            }

                            //返回结果
                            resolve(REdata)
                        })
                    })
                }

                //判断是否存在天气参数 ，若存在
                else {
                    var SrcAddAddress = EorzeaWeatherSrc + "?areaName=" + Address + "&targetWeather=" + Weather

                    //get 请求核心服务
                    http.get(SrcAddAddress, function (req, res) {
                        var content = ''
                        req.on('data', function (data) {
                            content += data
                        })
                        req.on('end', function () {

                            // 格式化返回数据
                            var EorzeaWeather_data = JSON.parse(content)

                            //核心服务返回ok
                            if (EorzeaWeather_data.ok === true) {
                                var EorzeaWeather_data = JSON.parse(content)
                                var REdataJSON = EorzeaWeather_data.data
                                var REdata = Address + Weather + "天气情况\r\n"

                                //字符拼接，根据返回数组长度进行输出
                                for (let i = 0; i < REdataJSON.length; i++) {
                                    REdata += REdataJSON[i].startTime + ":00 " + REdataJSON[i].LocalTime + " " + REdataJSON[i].weather + "\r\n"
                                }

                                //核心服务返回错误信息
                            } else {
                                var REdata = "喵天气：" + EorzeaWeather_data.message
                            }

                            //返回结果
                            resolve(REdata)
                        })
                    })
                }
            } else {
                resolve("喵天气：请指定地图")
            }
        })
        //返回函数
        return EorzeaWeatherHttp

    }

    //演奏音乐会情报
    ConcertInfo() {
        const ConcertHttp = new Promise(function (resolve, reject) {
            //get 请求核心服务
            http.get(ConcertSrc, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var Concert_data = JSON.parse(content)
                    var REdata = Concert_data.data

                    // 格式化返回数据
                    var Concert_data = JSON.parse(content)

                    //核心服务返回ok
                    if (Concert_data.ok === true) {
                        var REdataJSON = Concert_data.data
                        var REdata = "音乐会情报\r\n" + "信息来源：" + REdataJSON[0].url + "\r\n"

                        //限制返回数量最多为5条
                        if (REdataJSON.length > 5) {
                            REdataJSON.length = 5
                        }

                        //字符拼接，根据返回数组长度进行输出
                        for (let i = 0; i < REdataJSON.length; i++) {
                            // REdata += "数据更新： " + REdataJSON[i].update + " 数据源： " + REdataJSON[i].author + "\r\n" + "［演出日期］:" + REdataJSON[i].info.time + "\r\n" + "［入场］:" + REdataJSON[i].info.entranceTime + "［开演］:" + REdataJSON[i].info.startTime + "［持续时长］:约" + REdataJSON[i].info.duration + "分钟" + "\r\n" + "区服" + REdataJSON[i].info.concertServer + "\r\n"

                            REdata += "数据更新： " + "白猫老师！" + "\r\n" + "［区服］" + REdataJSON[i].info.concertLocal + "\r\n" + "［演出日期］:" + REdataJSON[i].info.time + "\r\n" + "［入场］:" + REdataJSON[i].info.entranceTime + "\r\n"
                        }

                        //核心服务返回错误信息
                    } else {
                        var REdata = "喵：" + Concert_data.message
                    }

                    //返回结果
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return ConcertHttp
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



module.exports = transfer