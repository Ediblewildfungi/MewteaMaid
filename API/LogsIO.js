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

class Logger {
  todayTimestamp = 0

  _fsStream = null

  _silenceMode = true

  _logDir = ''

  /**
   *
   * @param {string} logDir 日志文件夹
   * @param {boolean} isSilence 静默模式，启用时不输出日志到控制台，默认启用
   */
  constructor(logDir, isSilence = true) {
    this._logDir = logDir
    this._silenceMode = isSilence

    const nowDate = new Date()

    this._initFsStream(nowDate)

    nowDate.setHours(0, 0, 0, 0)
    this.todayTimestamp = nowDate.getTime()
  }

  _initFsStream(date) {
    // 以日期为文件名创建log文件
    const logFilePath = path.resolve(__dirname, this._logDir, dateFormatter(date) + '.log')

    this._fsStream && this._fsStream.close()
    this._fsStream = fs.createWriteStream(logFilePath, {
      flags: 'a',
    })
  }

  _checkLogFileIsExpired(date) {
    // 86400000 = 24 * 60 * 60 * 1000
    if (date - this.todayTimestamp < 86400000) {
      return
    }

    this._initFsStream(date)
  }

  _print(level, logText) {
    const nowDate = new Date()

    this._checkLogFileIsExpired(nowDate)

    const logTime = timeFormatter(nowDate)

    if (!this._silenceMode) {
      const textColor = level === 'error' ? '41' : 42
      console.log(`\u001b[${textColor};30m [${level}] \u001b[0m \u001b[44;30m [${logTime}] \u001b[0m : ${logText}\n`)
    }

    this._fsStream.write(`[ ${level} ] [${logTime}]: ${logText}\n`)
  }

  info(message) {
    this._print('info ', message)
  }

  error(message) {
    this._print('error', message)
  }
}

module.exports = Logger
