const Router = require('@koa/router')

const hitokotoController = require('../controllers/hitokoto')

const router = new Router({
  prefix: '/hitokoto',
})

router.get('/', hitokotoController.fetch)

module.exports = router
