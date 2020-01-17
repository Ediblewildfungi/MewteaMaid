const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getEorzeaWeather = require('../../helpers/eorzeaWeather')

const getText = (el) => {
  return el
    .text()
    .trim()
}

module.exports = {
  fetchFashionReport: async (ctx, next) => {
    try {
      const fashionReportListResponse = await fetch('https://api.ffxiv.cn/ajax/Articles/GetArticleListByClassId/13')

      const fashionReportList = await fashionReportListResponse.json()

      // 取出最近的结果
      const aId = fashionReportList[0]['AID']

      const articleDetailResponse = await fetch(`https://api.ffxiv.cn/ajax/Articles/Index/${ aId }`)

      const articleDetail = await articleDetailResponse.json()

      const { AContent, Title, AuName, MODAT } = articleDetail

      // 从文章的 HTML 文本中解析装备列表
      const $ = cheerio.load(`<div>${ AContent }</div>`)
      const head = getText($('.table > tbody > tr:nth-child(2) > td:first-child'))
      const coat = getText($('.table > tbody > tr:nth-child(3) > td:first-child'))
      const hand = getText($('.table > tbody > tr:nth-child(4) > td:first-child'))
      const leg = getText($('.table > tbody > tr:nth-child(5) > td:first-child'))
      const foot = getText($('.table > tbody > tr:nth-child(6) > td:first-child'))
      const earring = getText($('.table > tbody > tr:nth-child(2) > td:last-child'))
      const necklace = getText($('.table > tbody > tr:nth-child(3) > td:last-child'))
      const bracelet = getText($('.table > tbody > tr:nth-child(4) > td:last-child'))
      const ring = getText($('.table > tbody > tr:nth-child(5) > td:last-child')) || getText($(
        '.table > tbody > tr:nth-child(6) > td:last-child'))

      ctx.sendOk({
        title: Title,
        author: AuName,
        update: MODAT,
        answer: {
          head,
          coat,
          hand,
          leg,
          foot,
          earring,
          necklace,
          bracelet,
          ring,
        },
      })
    } catch (e) {
      ctx.logger.error(`素素时尚品鉴异常: ${ e.message }`)
      ctx.sendError(e.message || '素素时尚品鉴暂不可用，请稍后重试！')
    }

    return next()
  },

  createWeatherForecast: (ctx, next) => {
    const { timestamp = Date.now(), areaName, targetWeather, prevWeather } = ctx.request.query

    const ans = getEorzeaWeather(timestamp, areaName, targetWeather, prevWeather)

    if (typeof ans === 'string') {
      ctx.sendError(ans)
    } else {
      ctx.sendOk(ans)
    }

    return next()
  },
  createConcertForecast: async (ctx, next) => {
    try {
      

      // 抓取首页html
      // const articleDetailResponse = await fetch('http://event.ffxiv.cat/')
      
      // 获取ID为26的页面的数据
      const articleDetailResponseJson = await fetch('http://event.ffxiv.cat/wp-json/wp/v2/pages/26')
      const articleDetail = await articleDetailResponseJson.json()

      const { content, title, AuName, modified } = articleDetail

      // 从文章的 HTML 文本中解析装备列表
      const $ = cheerio.load(`<div>${ content.rendered }</div>`)
      const time = getText($('div.dt-fancy-title'))
      const hand = getText($('div.wpb_wrapper'))

      ctx.sendOk({
        title: "FFXIV 音乐会信息",
        author: "黑尾白猫",
        update: modified,
        answer: {
          time,
          hand,
        },
      })
    } catch (e) {
      ctx.logger.error(`白猫抛出了一个异常: ${ e.message }`)
      ctx.sendError(e.message || '白猫老师抛出了一个异常，请稍后重试！')
    }

    return next()
  },
}
