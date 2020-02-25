const path = require('path')
const Koa = require('koa')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koaJson = require('koa-json')
const koaFavicon = require('koa-favicon');
const Router = require('@koa/router')

const Logger = require('../helpers/logger')
const responseCz = require('./middleware/responsecz')

const hitokoto = require('./routes/hitokoto')
const eWeather = require('./routes/earthWeather')
const ffxiv = require('./routes/ffxiv')

const app = new Koa()

const router = new Router()
const PORT = process.env.PORT || 3600

router.all('/api/v1', (ctx, next) => {
  ctx.sendOk({
    message: '妹抖酱正在打扫庭院。',
  })

  return next()
})

app.use(koaFavicon('./favicon.png')); 
router.use('/api/v1', hitokoto.routes(), ffxiv.routes(),eWeather.routes())

const logger = Logger(path.resolve(__dirname, '../../logs'), process.env.NODE_ENV !== 'development')

// If in a production environment, the log will be output to the hard disk
if (process.env.NODE_ENV === 'production') {
  app.use(koaLogger((str, [format, method, url, status, time, length]) => {
    if (status == null) {
      return
    }
    logger.info(`${ method } ${ url } ${ status } ${ time } ${ length }`)
  }))
} else {
  app.use(koaLogger())
}

app.use((ctx, next) => {
  ctx.logger = logger

  return next()
})
app.use(bodyParser())
app.use(koaJson({ pretty: process.env.NODE_ENV !== 'production' }))
app.use(responseCz())
app.use(router.routes())

if (process.env.NODE_ENV === 'development') {
  console.log('routes: ', router.stack.map(i => i.path))
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Koa is running on port ${ PORT }`)
  })
}

app.on('error', err => {
  logger.error('server error! ', err.message)
})

module.exports = app
