// 服务入口 接收CQP 的上报消息 并转换为 API指令传入
// 开发中
const path = require('path')
const http = require('http')
const Koa = require('koa')
const fetch = require('node-fetch')
const bodyParser = require('koa-bodyparser')
const transfer = require('./transfer')
const Logger = require('../helpers/logger')
const config = require("./config")


const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')


//服务端口
const MI_PORT = config.server.MI_PORT

const app = new Koa()

app.use(bodyParser())


app.use( async (ctx) => {

    ctx.body = {
        ok: true,
        data: ctx.request.body,
      }
})

app.listen(MI_PORT, () => {
    logger.info(`KQ_Accept is running on port ${MI_PORT}`)
})