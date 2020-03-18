const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getEorzeaWeather = require('../../helpers/eorzeaWeather')
const getEorzeaServerChID = require('../../helpers/eorzeaServerCh')

const getText = (el) => {
  return el
    .text()
    .trim()
}

module.exports = {
  fetchFashionReport: async (ctx, next) => {

    let fashionReportListResponse = null

    const fashionReportListSource = ['http://nuannuan.yorushika.co:5000/']

    for (let i = 0; i < fashionReportListSource.length; i++) {
      fashionReportListResponse = await fetch(`${fashionReportListSource[i]}${ctx.request.search}`)

      if (fashionReportListResponse.ok) {
        ctx.sendOk(await fashionReportListResponse.json())

        return next()
      }
    }

    ctx.logger.error('时尚品鉴服务异常')
    ctx.sendError('时尚品鉴暂不可用，请稍后重试！')



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

  createConcertInfo: async (ctx, next) => {
    try {

      //获取最新更新页面信息
      const concertInfoListResponse = await fetch('http://event.ffxiv.cat/wp-json/wp/v2/pages')
      const concertInfoList = await concertInfoListResponse.json()

      // 取出最近的结果
      const cId = concertInfoList[0]['id']

      // 获取ID为cId的页面的数据
      const articleDetailResponseJson = await fetch(`http://event.ffxiv.cat/wp-json/wp/v2/pages/${cId}`)
      const articleDetail = await articleDetailResponseJson.json()

      const { content, title, AuName, modified } = articleDetail

      // 从文章的 HTML 文本中解析列表
      const $ = cheerio.load(`<div>${content.rendered}</div>`)
      let cDate = getText($('div.dt-fancy-title'))
      const fetchText = getText($('[style="text-align: center; color: #707070;"]'))

      const concertTitle = getText($('[style="text-align: left; font-size: 42px; color: #191919;"]'))

      concertLocal = (i) => getText($('.eventLoc').eq(i))

      const concertCont = cDate.length / 5

      let concertDate = []

      for (let i = 0, len = concertCont; i < len; i++) {
        let subStr = cDate.substr(0, 5)
        concertDate.push(subStr)
        cDate = cDate.replace(subStr, "")
      }

      //入场时间正则表达式  “场］”  “ /”之间
      var entranceTimeRe = /(?<=\u573a\uff3d).*?(?=\u002f)/g

      //开演时间正则表达式  “演］”  “ 预”之间
      var startTimeRe = /(?<=\u6f14\uff3d).*?(?=\u9884)/g

      //预计演奏时长正则表达式  “预计演奏时长”  “ 分钟”之间
      var durationRe = /(?<=\u9884\u8ba1\u6f14\u594f\u65f6\u957f).*?(?=\u5206\u949f)/g

      //粉丝及情报群正则表达式  “粉丝及情报群”  “ 字母、中文”之间
      var QQGroupRe = /[1-9][0-9]{4,}/g


      var entranceTime = fetchText.match(entranceTimeRe)
      var startTime = fetchText.match(startTimeRe)
      var duration = fetchText.match(durationRe)
      var QQGroup = fetchText.match(QQGroupRe)

      var send = []

      for (let i = 0; i < concertCont; i++) {

        let d = {
          title: "FFXIV 音乐会信息",
          author: "白猫老师的发布站",
          url: "http://event.ffxiv.cat/",
          update: modified,
          info: {
            concertTitle,
            time: concertDate[i],
            entranceTime: entranceTime[i],
            startTime: startTime[i],
            duration: duration[i],
            QQGroup: QQGroup[i],
            concertLocal: concertLocal(i),
            // fetchText,
            concertInfoListResponse,
          },
        }

        send[i] = d

      }

      ctx.sendOk(send)
    } catch (e) {
      ctx.logger.error(`白猫老师抛出了一个异常: ${e.message}`)
      ctx.sendError(e.message || '白猫老师抛出了一个异常，请稍后重试！')
    }

    return next()
  },
  createRaidInfo: async (ctx, next) => {

    let fashionReportListResponse = null

    const {serverName,userName} = ctx.request.query

    const fashionReportListSource = ['http://act.ff.sdo.com/20180525HeroList/Server/HeroList190128.ashx?']

    const ans = getEorzeaServerChID(serverName)
    
    questData = {

      method:"queryhreodata",
      Stage :2,
      Name:userName,
      AreaId:ans.areaid,
      GroupId:ans.serverid,
    }

    // JSON.string(questData)

    
// /---------------------
    ///服务器 

    // ctx.request.search

    for (let i = 0; i < fashionReportListSource.length; i++) {
      fashionReportListResponse = await fetch(`${fashionReportListSource[i]}${new URLSearchParams(questData).toString()}`, { method: 'POST'})

      if (fashionReportListResponse.ok) {
        ctx.sendOk(await fashionReportListResponse.json())

        return next()

      }
    }

    ctx.logger.error('sdo服务异常')
    ctx.sendError("喵！！呜呜呜喵~ 出错了！喵呜呜呜~")



    return next()
  },
}
