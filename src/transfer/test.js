
const http = require('http')

//1.js
const aSrc = "http://127.0.0.1:3000/api/v1/hitokoto"
const HitokotoHttp = new Promise(function (resolve, reject) {
  //get 请求核心服务
  http.get(aSrc, function (req, res) {
    var content = ''
    req.on('data', function (data) {
      content += data
    })
    req.on('end', function () {
      // console.info(content)
      var message_data = JSON.parse(content)
      var REdata = message_data.data
      // console.info(REdata.hitokoto)
      // return REdata
      resolve(REdata.hitokoto)
    })


    //向KQ返回数据
  })
})


//2.js
HitokotoHttp.then(function (value) {
  console.log(value)
  
})

AAmessage = "喵天气"
AAmessageArr=AAmessage.split(/\s+/); 
AAmessage = AAmessage.substring(0,3)
console.log(AAmessage)
console.log(AAmessageArr)