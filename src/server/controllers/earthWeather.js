
//地球天气查询服务 earthWeather eWeather
//采用了和风天气API

const fetch = require('node-fetch')

module.exports = {
  fetch: async (ctx, next) => {
    let eWeatherResponse = null

    const eWeatherSource = ['https://free-api.heweather.net/s6/weather/now']

    for (let i = 0; i < eWeatherSource.length; i++) {
      eWeatherResponse = await fetch(`${ eWeatherSource[i] }${ ctx.request.search }`)

      if (eWeatherResponse.ok) {
        ctx.sendOk(await eWeatherResponse.json())

        return next()
      }
    }

    ctx.logger.error('天气服务异常')
    ctx.sendError('天气查询服务暂不可用，请稍后重试！')

    return next()
  },
}


