const Router = require('@koa/router')

const ffxivController = require('../controllers/ffxiv')

const router = new Router({
  prefix: '/ffxiv',
})

router.get('/fashionReport', ffxivController.fetchFashionReport)

router.get('/weather', ffxivController.createWeatherForecast)

module.exports = router