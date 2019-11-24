const {
  dateFormatter,
  timeFormatter,
} = require('../utils/formatter')

// 艾欧泽亚时间 1h 等于地球 175s
const EORZEA_TIME_RATIO = 3600 / 175

/**
 * 艾欧泽亚时钟
 * @param {number} timestamp
 */
const EorzeaClock = function (timestamp) {
  this.eorzeaDate = new Date(timestamp)
}

EorzeaClock.fromLocalTimestamp = (timestamp) => {
  return new EorzeaClock(timestamp * EORZEA_TIME_RATIO)
}

const getDaysCount = function () {
  // 86400000 = 60 * 60 * 24 * 1000
  return Math.floor(this.eorzeaDate.getTime() / 86400000)
}

const getHours = function () {
  return this.eorzeaDate.getUTCHours()
}

const setHours = function (...hours) {
  this.eorzeaDate.setUTCHours(...hours)
}

const getMinutes = function () {
  return this.eorzeaDate.getUTCMinutes()
}

const toTimeString = function () {
  const hh = this.getHours()
  const mm = this.getMinutes()

  return `${ hh < 10 ? '0' + hh : hh }:${ mm < 10 ? '0' + mm : mm }`
}

const toLocalTimeString = function () {
  const localDate = new Date(this.eorzeaDate.getTime() / EORZEA_TIME_RATIO)

  return dateFormatter(localDate) + ' ' + timeFormatter(localDate)
}

const createViaAddHours = function (hours) {
  // 3600000 = 60 * 60 * 1000
  return new EorzeaClock(this.eorzeaDate.getTime() + hours * 3600000)
}

EorzeaClock.prototype = {
  getDaysCount,
  getHours,
  setHours,
  getMinutes,
  toTimeString,
  toLocalTimeString,
  createViaAddHours,
}

module.exports = EorzeaClock
