/**
 * 日期格式化
 * @param {Date} date
 */
const dateFormatter = date => {
  const yyyy = date.getFullYear()
  const MM = date.getMonth() +1
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

module.exports = {
  dateFormatter,
  timeFormatter,
}
