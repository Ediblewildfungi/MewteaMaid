"use strict"

// 日志写入模块

// 导入fs模块gir
const fs = require('fs')

// 是否开启单元测试模式，开启后单元可独立测试
const UNIT_TEST_MODE = true

// 日志记录方法
class Logger {

  _fsStream = null
  _silenceMode = true

  constructor(logFilePath, isSilence = true) {

    // 获取当前日期
    const logsNewDate = new Date();
    const logsDateTime = logsNewDate.toLocaleString()
    const logsDate = logsNewDate.toLocaleDateString()

    // 以日期为文件名创建log文件
    logFilePath  = '../logs/' + logsDate + ".log"

    if (typeof logFilePath !== 'string' || logFilePath === '') {
      throw new Error('Logger constructor: logFilePath must be string')
    }

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '')
    }

    this._fsStream = fs.createWriteStream(logFilePath, {
      flags: 'a',
    })
    this._silenceMode = isSilence
  }

  _print(level, logText) {
    const logTime = new Date().toLocaleString()
    if (!this._silenceMode) {
      const textColor = level === 'error' ? '41' : 42
      console.log(`\u001b[${textColor};30m[${level}] \u001b[0m \u001b[44;30m [${logTime}] \u001b[0m : ${logText}\n`)
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


// function LogsIo(message) {

//   // 获取当前日期
//   const logsNewDate = new Date();
//   const logsDateTime = logsNewDate.toLocaleString()
//   const logsDate = logsNewDate.toLocaleDateString()

//   //写入日志的内容
//   const logsMessage = logsDateTime + " " + message + "\n"

//   // 创建日志文件
//   LogsFs.appendFile('./logs/' + logsDate + '.txt', logsMessage, function (err) {
//     if (err) throw err
//     console.log('Saved!')
//   })


//   console.log(logsDateTime)

// }


// 单元测试代码
if (UNIT_TEST_MODE) {

  const logger = new Logger('./demo.log', false)

  const message = ""

  setInterval(() => {
    logger[Math.random() < 0.5 ? 'info' : 'error']('滴答')
  }, 1000)

}


