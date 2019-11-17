const fs = require('fs')

class Logger {
  _fsStream = null

  _silenceMode = true

  constructor(logFilePath, isSilence = true) {
    if (typeof logFilePath !== 'string' || logFilePath === '') {
      throw new Error('Logger constructor: logFilePath must be string')
    }

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath)
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

// 使用示例

const logger = new Logger('./demo.log', false)

setInterval(() => {
  logger[Math.random() < 0.5 ? 'info' : 'error']('滴答')
}, 1000)
