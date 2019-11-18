const Logger = require('./LogsIO')

const logger = new Logger('../logs', false)

setInterval(() => {
  logger[Math.random() < 0.5 ? 'info' : 'error']('滴答')
}, 1000)
