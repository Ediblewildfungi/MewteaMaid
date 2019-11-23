/**
 * 日志记录模块
 */

const fs = require('fs')
const path = require('path')

/**
 * 日期格式化
 * @param {Date} date
 */
const dateFormatter = date => {
  const yyyy = date.getFullYear()
  const MM = date.getMonth()
  const dd = date.getDate()

  return yyyy + '-' + (MM < 10 ? '0' + MM : MM) + '-' + (dd < 10 ? '0' + dd : dd)
}

/**
 * 时间格式化
 * @param {Date} date
 */
const timeFormatter = date => {
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return hh + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
}

/**
 *
 * @param {string} logDir 日志文件夹，绝对路径
 * @param {boolean} silenceMode 静默模式，启用时不输出日志到控制台，默认启用
 */
const Logger = (logDir, silenceMode = true) => {
  let todayTimestamp = 0
  let fsStream = null

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }

  const initFsStream = (date) => {
    // 以日期为文件名创建log文件
    const logFilePath = path.resolve(logDir, dateFormatter(date) + '.log')

    fsStream && fsStream.close()
    fsStream = fs.createWriteStream(logFilePath, {
      flags: 'a',
    })
  }

  const checkLogFileIsExpired = (date) => {
    // 86400000 = 24 * 60 * 60 * 1000
    if (date - todayTimestamp < 86400000) {
      return
    }

    initFsStream(date)
  }

  const print = (level, logText) => {
    const nowDate = new Date()

    checkLogFileIsExpired(nowDate)

    const logTime = timeFormatter(nowDate)

    if (!silenceMode) {
      const textColor = level === 'error' ? '31' : 32
      console.log(`\u001b[40;${ textColor }m${ level }\u001b[0m \u001b[40;34m${ logTime }\u001b[0m - ${ logText }\n`)
    }

    fsStream.write(`${ level } ${ logTime } - ${ logText }\n`)
  }

  const nowDate = new Date()
  initFsStream(nowDate)
  nowDate.setHours(0, 0, 0, 0)
  todayTimestamp = nowDate.getTime()

  return {
    info: (message) => {
      print('info ', message)
    },

    error: (message) => {
      print('error', message)
    },
  }
}

module.exports = Logger
