"use strict"
// 服务入口 接收CQP 的上报消息 以及其他指令

const https = require('https')
// var log = require('../LogsIO')

// 是否开启单元测试模式，开启后单元可独立测试
const UNIT_TEST_MODE = true

class Hitokoto {
    hitokotoWord = ""
    hitokotoFrom = ""
    constructor() {
        https.get('https://v1.hitokoto.cn/?c=a', (res) => {
            console.log('Hitokoto Status code:', res.statusCode)
            // console.log('headers:', res.headers)

            res.on('data', (d) => {
                // process.stdout.write(d)
                const dataHitokoto = JSON.parse(d)
                console.log("Hitokoto word " + dataHitokoto.hitokoto)
                console.log("Hitokoto form " + dataHitokoto.from)

                this.hitokotoWord = dataHitokoto.hitokoto
                this.hitokotoFrom = dataHitokoto.from

                // return {"hitokoto":dataHitokoto.hitokoto ,  "from":dataHitokoto.from}
            })
        }).on('error', (e) => {
            // console.error(e)
        })
        // return {"hitokoto":this.hitokotoWord + "111111" ,  "from":this.hitokotoFrom}
    }
}



if (UNIT_TEST_MODE) {

    const hitokoto = new Hitokoto()

    console.log(hitokoto.hitokoto)


} 