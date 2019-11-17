"use strict"

// 日志写入模块

// 导入fs模块
const LogsFs = require('fs')

// 是否开启单元测试模式，开启后单元可独立测试
const UNIT_TEST_MODE = true

// 主函数
function LogsIo(message) {

  // 获取当前日期
  const logsNewDate = new Date();
  const logsDateTime = logsNewDate.toLocaleString()
  const logsDate = logsNewDate.toLocaleDateString()

  //写入日志的内容
  const logsMessage = logsDateTime + " " + message + "\n"

  // 创建日志文件
  LogsFs.appendFile('./logs/' + logsDate + '.txt', logsMessage, function (err) {
    if (err) throw err
    console.log('Saved!')
  })


  console.log(logsDateTime)

}

// 单元测试代码
if (UNIT_TEST_MODE) {
  LogsIo("hi222!")
}


