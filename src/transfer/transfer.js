const http = require('http')
const querystring = require("querystring")

const config = require("./config")
//核心服务版本以及请求地址
const KernelSrc = "http://127.0.0.1:3000/api/v1/"

//一言请求地址
const HitokotoSrc = KernelSrc + "hitokoto"

//地球天气请求地址
const EWeatherSrc = KernelSrc + "eweather"

//暖暖请求地址
const NuannuanSrc = KernelSrc + "ffxiv/fashionReport"

//艾欧泽亚天气请求地址
const EorzeaWeatherSrc = KernelSrc + "ffxiv/weather"

//艾欧泽亚天气请求地址
const ConcertSrc = KernelSrc + "ffxiv/concert"

//零式出警请求地址
const RaidSrc = KernelSrc + "ffxiv/raid"

//输入处理
const transfer = class Transfer {

    constructor(app, post_type, self_id, user_id, message_type, group_id, message) {

        this.message = message
        this.messageArr = this.message.split(/\s+/)
        this.post_type = post_type
        this.user_id = user_id

        if (group_id == "none") {
            this.re_id = user_id
            this.re_type = "private"
        } else {
            this.re_id = group_id
            this.re_type = "group"
        }
    }
    get REmessage() {

        if (this.message == "喵一言") {
            return this.Hitokoto(this.re_type, this.re_id)
        } else if (this.message == "喵暖暖") {
            return this.Nuannuan(this.re_type, this.re_id)
        } else if (this.message.substring(0, 3) == "喵天气") {
            return this.EorzeaWeather(this.re_type, this.re_id, this.messageArr)
        } else if (this.message == "喵音乐会") {
            return this.ConcertInfo(this.re_type, this.re_id)
        } else if (this.message == "喵输出") {
            return this.OtherMessage(this.re_type, this.re_id)
        } else if (this.message.substring(0, 3) == "喵零式") {
            return this.EorzeaRaidInfo(this.re_type, this.re_id, this.messageArr)
        } else if (this.message == "喵预留2") {
            return this.OtherMessage(this.re_type, this.re_id)

            // 群成员增加
        } else if (this.post_type == "notice" && this.message == "group_increase") {
            return this.GroupUserIncrease(this.re_type, this.re_id)
        } else if (this.message.substring(0, 3) == "喵你说" && this.user_id == 1034614154) {

            return this.MewYouSay(this.re_type, this.re_id, this.message)

        }
        else {
            return this.OtherMessage()
        }
    }
    //一言处理
    Hitokoto(re_type, re_id) {
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
                    var re_message = hitokoto_data.data

                    //输出一言与来源
                    var re_message = re_message.hitokoto + "\r\n" + "——" + re_message.from



                    var REdata = {
                        re_type,
                        re_id,
                        re_message,
                    }

                    resolve(REdata)
                })
            })
        })

        //返回函数
        return HitokotoHttp
    }

    //金蝶暖暖
    Nuannuan(re_type, re_id) {
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
                    var re_message = nuanuan_data.data
                    var text = "\n 来源： 露儿[Yorushika] / 游玩c哩酱"
                    var re_message = re_message.content + text


                    var REdata = {
                        re_type,
                        re_id,
                        re_message,
                    }
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return NuannuanHttp

    }

    //天气查询处理
    EorzeaWeather(re_type, re_id, messageArr) {
        const EorzeaWeatherHttp = new Promise(function (resolve, reject) {
            // console.log(messageArr[1])
            var Address = messageArr[1]
            var Weather = messageArr[2]

            //判断是否存在地区参数，如不存在，返回错误
            if (Address != undefined) {

                //判断是否存在天气参数，若不存在：
                if (Weather == undefined) {

                    var SrcEWAddAddress = EWeatherSrc + "?key=" + config.key.weatherKey + "&location=" + Address

                    //get 请求核心服务
                    http.get(SrcEWAddAddress, function (req, res) {
                        var content = ''
                        req.on('data', function (data) {
                            content += data
                        })
                        req.on('end', function () {

                            // 格式化返回数据
                            var EWeather_data = JSON.parse(content)

                            //核心/天气接口服务返回ok
                            if (EWeather_data.data.HeWeather6[0].status === "ok") {
                                var REdataJSON = EWeather_data.data.HeWeather6[0]

                                //字符拼接，根据返回数组长度进行输出
                                var re_message = REdataJSON.basic.location + "现在天气情况喵~\r\n"
                                re_message += "天气: " + REdataJSON.now.cond_txt + "\r\n"
                                re_message += "气温: " + REdataJSON.now.tmp + "\r\n"
                                re_message += "体感温度: " + REdataJSON.now.fl + "\r\n"
                                re_message += "相对湿度: " + REdataJSON.now.hum + "\r\n"
                                re_message += "更新日期: 北京时间" + REdataJSON.update.loc + "\r\n"


                                var REdata = {
                                    re_type,
                                    re_id,
                                    re_message,
                                }
                                //返回结果
                                resolve(REdata)

                                //核心服务返回错误信息
                            } else {

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
                                            var re_message = Address + "天气情况\r\n"

                                            //限制返回数量最多为5条
                                            if (REdataJSON.length > 5) {
                                                REdataJSON.length = 5
                                            }
                                            //字符拼接，根据返回数组长度进行输出
                                            for (let i = 0; i < REdataJSON.length; i++) {
                                                re_message += REdataJSON[i].startTime + ":00 " + REdataJSON[i].weather + "\r\n"
                                            }
                                            console.log(re_message)
                                            //核心服务返回错误信息
                                        } else {
                                            var re_message = "喵天气：" + EorzeaWeather_data.message
                                        }


                                        var REdata = {
                                            re_type,
                                            re_id,
                                            re_message,
                                        }
                                        //返回结果
                                        resolve(REdata)
                                    })
                                })
                            }

                            //返回结果
                            // resolve(REdata)
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
                                var re_message = Address + Weather + "天气情况\r\n"

                                //字符拼接，根据返回数组长度进行输出
                                for (let i = 0; i < REdataJSON.length; i++) {
                                    re_message += REdataJSON[i].startTime + ":00 " + REdataJSON[i].LocalTime + " " + REdataJSON[i].weather + "\r\n"
                                }

                                //核心服务返回错误信息
                            } else {
                                var re_message = "喵天气：" + EorzeaWeather_data.message
                            }

                            var REdata = {
                                re_type,
                                re_id,
                                re_message,
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
    ConcertInfo(re_type, re_id) {
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
                    var re_message = Concert_data.data

                    // 格式化返回数据
                    var Concert_data = JSON.parse(content)

                    //核心服务返回ok
                    if (Concert_data.ok === true) {
                        var REdataJSON = Concert_data.data
                        var re_message = "音乐会情报\r\n" + "信息来源：" + REdataJSON[0].url + "\r\n"

                        //限制返回数量最多为5条
                        if (REdataJSON.length > 5) {
                            REdataJSON.length = 5
                        }

                        //字符拼接，根据返回数组长度进行输出
                        for (let i = 0; i < REdataJSON.length; i++) {
                            // re_message += "数据更新： " + REdataJSON[i].update + " 数据源： " + REdataJSON[i].author + "\r\n" + "［演出日期］:" + REdataJSON[i].info.time + "\r\n" + "［入场］:" + REdataJSON[i].info.entranceTime + "［开演］:" + REdataJSON[i].info.startTime + "［持续时长］:约" + REdataJSON[i].info.duration + "分钟" + "\r\n" + "区服" + REdataJSON[i].info.concertServer + "\r\n"

                            re_message += "数据更新： " + "白猫老师！" + "\r\n" + "［区服］" + REdataJSON[i].info.concertLocal + "\r\n" + "［演出日期］:" + REdataJSON[i].info.time + "\r\n" + "［入场］:" + REdataJSON[i].info.entranceTime + "\r\n"
                        }

                        //核心服务返回错误信息
                    } else {
                        var re_message = "喵：" + Concert_data.message
                    }

                    var REdata = {
                        re_type,
                        re_id,
                        re_message,
                    }
                    //返回结果
                    resolve(REdata)
                })
            })
        })

        //返回函数
        return ConcertHttp
    }

    //群员增加
    GroupUserIncrease(re_type, re_id) {
        const GroupUserIncreasePromise = new Promise(function (resolve, reject) {

            var re_message = "欢迎~"

            var REdata = {
                re_type,
                re_id,
                re_message,
            }

            resolve(REdata)
        })

        //返回函数
        return GroupUserIncreasePromise
    }

    MewYouSay(re_type, re_id, message) {
        const GroupUserIncreasePromise = new Promise(function (resolve, reject) {

            var re_message = message.substring(3)

            var REdata = {
                re_type: "group",
                re_id: "875182235",
                re_message,
            }
            resolve(REdata)
        })

        //返回函数
        return GroupUserIncreasePromise
    }

    EorzeaRaidInfo(re_type, re_id, messageArr) {
        const RaidHttp = new Promise(function (resolve, reject) {

            var serverName = messageArr[1]
            var userName = messageArr[2]

            var SrcRaidAddress = RaidSrc + "?serverName=" + serverName + "&userName=" + userName

            //get 请求核心服务
            http.get(SrcRaidAddress, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var raid_data = JSON.parse(content)
                    var raid_data = raid_data.data.Attach

                    var l1 = raid_data.Level1.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")
                    var l2 = raid_data.Level2.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")
                    var l3 = raid_data.Level3.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")
                    var l4 = raid_data.Level4.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日")
                    
                    var re_message = userName + "的零式通关数据喵~ \r\n"

                    re_message += l1 + " 攻破了E1S \r\n"
                    re_message += l2 + " 攻破了E2S \r\n"
                    re_message += l3 + " 攻破了E3S \r\n"
                    re_message += l4 + " 攻破了E4S \r\n"
                    re_message += "呜喵~"

                    var REdata = {
                        re_type,
                        re_id,
                        re_message,
                    }

                    resolve(REdata)
                })
            })
        })

        //返回函数
        return RaidHttp
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
