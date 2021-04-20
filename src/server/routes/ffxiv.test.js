const request = require('supertest')

const app = require('../main')


// test('金蝶暖暖', async (done) => {
//   const response = await request(app.callback())
//     .get('/api/v1/ffxiv/fashionReport')

//   expect(response.body.ok)
//     .toBe(true)

//   expect(response.body.data)
//     .toHaveProperty('content')

//   expect(response.body.data)
//     .toHaveProperty('content')

//   expect(response.body.data)
//     .toHaveProperty('content')

//   expect(response.body.data)
//     .toHaveProperty('content')


//   done()
// })

test('艾欧泽亚天气 普通请求', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({ areaName: '利姆萨·罗敏萨' })

  expect(response.body.ok)
    .toBe(true)

  done()
})

test('艾欧泽亚天气 不存在的区域', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({ areaName: '拂晓之间' })

  expect(response.body.ok)
    .toBe(false)

  expect(response.body.message)
    .toBe('查找不到拂晓之间区域对应的天气数据')

  done()
})

test('艾欧泽亚天气 指定天气', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({
      timestamp: 1574611200000,
      areaName: '利姆萨·罗敏萨',
      targetWeather: '小雨',
    })

  expect(response.body.ok)
    .toBe(true)

  expect(response.body.data)
    .toEqual([
      { startTime: 8, LocalTime: '2019-11-24 23:53:20', weather: '小雨' },
      { startTime: 0, LocalTime: '2019-11-25 6:30:00', weather: '小雨' },
      { startTime: 8, LocalTime: '2019-11-25 9:13:20', weather: '小雨' },
    ])

  done()
})

test('艾欧泽亚天气 指定天气 前置天气', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({
      timestamp: 1574611200000,
      areaName: '利姆萨·罗敏萨',
      targetWeather: '小雨',
      prevWeather: '碧空',
    })

  expect(response.body.ok)
    .toBe(true)

  expect(response.body.data)
    .toEqual([
      { startTime: 8, LocalTime: '2019-11-24 23:53:20', weather: '小雨' },
      { startTime: 8, LocalTime: '2019-11-25 9:13:20', weather: '小雨' },
      { startTime: 0, LocalTime: '2019-11-25 15:50:00', weather: '小雨' },
    ])

  done()
})

test('艾欧泽亚天气 指定天气 不存在的目标天气', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({
      timestamp: 1574611200000,
      areaName: '利姆萨·罗敏萨',
      targetWeather: '沙尘暴',
    })

  expect(response.body.ok)
    .toBe(false)

  expect(response.body.message)
    .toBe('利姆萨·罗敏萨区域不可能出现沙尘暴天气')

  done()
})

test('艾欧泽亚天气 指定天气 不存在的前置天气', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/weather')
    .query({
      timestamp: 1574611200000,
      areaName: '利姆萨·罗敏萨',
      targetWeather: '小雨',
      prevWeather: '沙尘暴',
    })

  expect(response.body.ok)
    .toBe(false)

  expect(response.body.message)
    .toEqual('利姆萨·罗敏萨区域不可能出现沙尘暴天气')

  done()
})

// test('艾欧泽亚演奏信息获取', async (done) => {
//   const response = await request(app.callback())
//     .get('/api/v1/ffxiv/concert')

//   expect(response.body.ok)
//     .toBe(true)

//   for (let i = 0; i < response.body.data.length; i++) {
    
//   expect(response.body.data[i])
//     .toHaveProperty('info.concertTitle')

//   expect(response.body.data[i])
//     .toHaveProperty('info.time')

//   expect(response.body.data[i])
//     .toHaveProperty('info.entranceTime')

//   expect(response.body.data[i])
//     .toHaveProperty('info.startTime')

//   expect(response.body.data[i])
//     .toHaveProperty('info.duration')

//   expect(response.body.data[i])
//     .toHaveProperty('info.concertLocal')
//   }
//   done()
// })