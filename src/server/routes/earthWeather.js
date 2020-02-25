const Router = require('@koa/router')

const eWeatherController = require('../controllers/earthWeather')

const router = new Router({
  prefix: '/eWeather',
})

router.get('/', eWeatherController.fetch)

module.exports = router
