const http = require('http')
const config = require("./config")
// const querystring = require("querystring")
const random = require("./modules/random")

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

//logs排行请求地址
const DpsrankSrc = KernelSrc + "ffxiv/dpsrank"

const SETUSrc = config.server.SETU



//输入处理
const transfer = class Transfer {

    /**
     * 处理输入组件
     * @param app 传入的应用程序
     * @param post_type 输入类型 - 信息、通知
     * @param self_id 机器人id
     * @param user_id 用户id
     * @param message_type 消息类别 - 群组、私聊
     * @param group_id 群组id - 如无需要定义 "none"
     * @param message 信息内容
     * 
     */

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
        } else if (this.message.substring(0, 3) == "喵输出") {
            return this.EorzeaDpsRank(this.re_type, this.re_id, this.messageArr)
        } else if (this.message.substring(0, 3) == "喵零式") {
            return this.EorzeaRaidInfo(this.re_type, this.re_id, this.messageArr)
        } else if (this.message.substring(0, 3) == "喵色图") {
            return this.MiaoSetu(this.re_type, this.re_id)
        } else if (this.message.substring(0, 3) == "喵涩图") {
            return this.MiaoSetu(this.re_type, this.re_id)
        } else if (this.message == "喵帮助") {
            return this.MewHelp(this.re_type, this.re_id)


            // 群成员增加
        } else if (this.post_type == "notice" && this.message == "group_increase") {
            return this.GroupUserIncrease(this.re_type, this.re_id)
        } else if (this.message.substring(0, 3) == "喵你说" && this.user_id == config.Admin.id) {

            return this.MewYouSay(this.re_type, this.re_id, this.message)

        }
        else {
            return this.OtherMessage()
        }
    }

    MewHelp(re_type, re_id) {
        const GroupUserIncreasePromise = new Promise(function (resolve, reject) {

            var re_message = "目前支持的功能有: \n"
            re_message = re_message + "喵一言 \n"
            re_message = re_message + "喵暖暖 \n"
            re_message = re_message + "喵天气 地球城市/艾欧泽亚城市 \n"
            re_message = re_message + "喵天气 艾欧泽亚城市 天气类型 \n"
            re_message = re_message + "喵输出 职业名(昵称) 副本名(简称)	 \n"
            re_message = re_message + "喵零式 服务器 玩家名称	 \n"
            re_message = re_message + "喵出警 还没开发喵	 \n"
            re_message = re_message + "喵色图 （？？ 不存在的 \n"
            re_message = re_message + "喵你说 （限定"
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

    MiaoSetu(re_type, re_id) {
        const MiaoSetu = new Promise(function (resolve, reject) {
            var num = config.server.SETU_NUM
            // var SETUid = pad(randomNum(1,num),3)
            var SETUid = random()
            var link = SETUSrc + SETUid + ".jpg"
            var re_message = link
            var is_image = true
            // console.log(re_message)

            var REdata = {
                re_type,
                re_id,
                re_message,
                is_image,
            }
            console.log("getsetu",re_message,is_image)
            resolve(REdata)
        })

        //返回函数
        return MiaoSetu
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

            var re_message = "欢迎喵~"

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
                re_id: config.Admin.group,
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
                    // console.log(raid_data)
                    var raid_data = raid_data.data.Attach

                    var levelData = ""

                    for (let i = 1; i < 5; i++) {

                        let Data = 'raid_data.Level' + i

                        if (eval(Data) != "" && eval(Data)) {

                            var q = i+8
                            levelData = levelData + eval(Data).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日") + " 攻破了E" + q + "S \r\n"

                        } else {
                            levelData = levelData + " 尚未攻破E" + i + "S，加油哦 \r\n"
                        }
                        if (i == 4 && eval(Data) != "" && eval(Data)) {
                            levelData = levelData + "太强了"
                        }
                    }

                    //拼接
                    var re_message = userName + "的零式通关数据喵~ \r\n"
                    re_message += levelData
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
    EorzeaDpsRank(re_type, re_id, messageArr) {
        const RaidHttp = new Promise(function (resolve, reject) {

            var josbName = messageArr[1]
            var bossName = messageArr[2]

            var dpsType = "rdps"

            if (messageArr[3] == "adps") {
                dpsType = "adps"
            }


            var SrcDpsRankAddress = DpsrankSrc + "?josbName=" + josbName + "&bossName=" + bossName + "&dpsType=" + dpsType

            //get 请求核心服务
            http.get(SrcDpsRankAddress, function (req, res) {
                var content = ''
                req.on('data', function (data) {
                    content += data
                })
                req.on('end', function () {

                    // 格式化返回数据
                    var raid_data = JSON.parse(content)
                    var raid_data = raid_data.data

                    var levelData = ""

                    if (raid_data.job.cnName) {
                        if (raid_data.boss.cnName) {
                            levelData = raid_data.job.cnName + "的<" + raid_data.boss.cnName + "> ["+ dpsType +"] 数据喵~ \r\n"
                            levelData += "10% -> " + raid_data.Percent["10"] + "\r\n"
                            levelData += "25% -> " + raid_data.Percent["25"] + "\r\n"
                            levelData += "50% -> " + raid_data.Percent["50"] + "\r\n"
                            levelData += "75% -> " + raid_data.Percent["75"] + "\r\n"
                            levelData += "95% -> " + raid_data.Percent["95"] + "\r\n"
                            levelData += "99% -> " + raid_data.Percent["99"] + "\r\n"
                            levelData += "TOP -> " + raid_data.Percent["100"] + "\r\n"
                        } else {
                            levelData = "木有找到数据喵，这是什么过气boss喵~"
                        }
                    } else {
                        levelData = "职业木有找到"
                    }



                    //拼接
                    var re_message = levelData + "呜喵~"

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
