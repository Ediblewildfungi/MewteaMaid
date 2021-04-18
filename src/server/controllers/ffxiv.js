const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getEorzeaWeather = require('../../helpers/eorzeaWeather')
const getEorzeaServerChID = require('../../helpers/eorzeaServerCh')
const getEorzeaJob = require('../../helpers/eorzeaJob')
const getEorzeaBoss = require('../../helpers/eorzeaBoss')

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

    let RaidInfoResponse = null
    const { serverName, userName } = ctx.request.query
    const RaidInfoSource = 'https://actff1.web.sdo.com/20180525HeroList/Server/HeroList190128.ashx?'
    const ans = getEorzeaServerChID(serverName)

    questData = {
      method: "queryhreodata",
      Stage: 4,
      Name: userName,
      AreaId: ans.areaid,
      GroupId: ans.serverid,
    }

    RaidInfoResponse = await fetch(`${RaidInfoSource}${new URLSearchParams(questData).toString()}`, { method: 'POST' })
    if (RaidInfoResponse.ok) {
      
      ctx.logger.info("Server - QuestData - " + `${RaidInfoSource}${new URLSearchParams(questData).toString()}`)
      ctx.sendOk(await RaidInfoResponse.json())
      return next()
    }

    ctx.logger.error('sdo服务异常')
    ctx.sendError("喵！！呜呜呜喵~ 出错了！喵呜呜呜~")

    return next()
  },

  createDpsRank: async (ctx, next) => {
    try {
      let DpsRankResponse = null
      const { bossName, josbName, dpsType } = ctx.request.query

      const job = getEorzeaJob(josbName)
      const boss = getEorzeaBoss(bossName)

      let sdpsType = "rdps"

      if (dpsType == "adps") {
        sdpsType = "pdps"
      }

      if (job.ok && boss.ok) {
        job.name = job.name.replace(/\s+/g, "");

        // DpsRankSource =  https://www.fflogs.com/zone/statistics/table/{z}/dps/{id}/{s}/8/{s}/100/1000/7/{0}/Global/{jobna}/All/0/normalized/single/0/-1/?keystone=15&dpstype={rdps}
        // DpsRankSource = 'https://www.fflogs.com/zone/statistics/table/28/dps/1046/100/8/5/100/1000/7/0/Global/Astrologian/All/0/normalized/single/0/-1/?keystone=15&dpstype=adps'
        // DpsRankSource = 'https://cn.fflogs.com/zone/statistics/table/32/dps/1050/100/8/3/100/1/14/0/Global/Astrologian/All/0/normalized/single/0/-1/?keystone=15&dpstype=rdps'
        DpsRankSource = "https://cn.fflogs.com/zone/statistics/table/" + boss.zone + "/dps/" + boss.id + "/" + boss.difficulty + "/8/" + boss.bossCnServer + "/100/1/14/0/Global/" + job.name + "/All/0/normalized/single/0/-1/?keystone=15&dpstype=" + sdpsType
        
        // DpsRankSourc3 = "https://cn.fflogs.com/zone/statistics/table/    30           /dps/     1048      /101/8/       3                 /100/1/14/0/Global/BlackMage       /All/0/normalized/single/0/-1/?keystone=15&dpstype=rdps"
        // DpsRankSource = "https://cn.fflogs.com/zone/statistics/table/30/dps/1048/100/8/3/100/1/14/0/Global/BlackMage/All/0/normalized/single/0/-1/?keystone=15&dpstype=rdps"
        // questData = {
        //   zoneid: boss.zone,
        //   bossId: boss.id,
        //   bossSavage: 100/101,
        //   bossCnServer: boss.bossCnServer,
        //   bossPatch: 0,
        //   jobName: job.name,
        //   dps_type: "rdps"
        // }
        ctx.logger.info("Server - QuestData - " + DpsRankSource)
        DpsRankResponse = await fetch(DpsRankSource, { headers: { 'referer': 'https://cn.fflogs.com' } })
        DpsRankResponse = await DpsRankResponse.text()
      } else {
        DpsRankResponse = ""
      }

      // const percent = [10, 25, 50, 75, 95, 99, 100]

      var DpsRank = []
      var reg = null

      //dps 10 ~ 99
      reg = /series(\d+)\.data\.push\(([\d\.]+)\)/g
      Percent = Array.from(DpsRankResponse.matchAll(reg)).reduce((acc, item) => {

        try {
          acc[item[1]] = parseFloat(item[2]).toFixed(2)
        } catch (error) {
          acc[item[1]] = "无数据"
        }

        return acc
      }, {})

      //dps 100
      reg = new RegExp(/series\.data\.push\(([\d\.]+)\)/)
      try {
        Percent["100"] = parseFloat(DpsRankResponse.match(reg)[1]).toFixed(2)
      } catch (error) {
        Percent["100"] = "无数据"
      }


      let send = {
        job,
        boss,
        Percent,
      }

      ctx.sendOk(send)

    } catch (e) {
      ctx.logger.error('logs服务异常')
      ctx.sendError("喵！！呜呜呜喵~ 出错了！喵呜呜呜~" + e)
    }
    return next()
  },

  fetchUniversalis: async (ctx, next) => {


  },






}
