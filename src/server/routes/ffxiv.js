const Router = require('@koa/router')

const ffxivController = require('../controllers/ffxiv')
const universalisController = require('../controllers/universalis')

const router = new Router({
  prefix: '/ffxiv',
})

router.get('/fashionReport', ffxivController.fetchFashionReport)

router.get('/weather', ffxivController.createWeatherForecast)

router.get('/concert', ffxivController.createConcertInfo)

router.get('/raid', ffxivController.createRaidInfo)

router.get('/dpsrank', ffxivController.createDpsRank)

router.get('/ItemSearch', ffxivController.createItemSearch)

router.get('/universalis', ffxivController.createUniversalisSearch)

module.exports = router
