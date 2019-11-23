const request = require('supertest')

const app = require('../main')

test('获取一言', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/hitokoto')

  expect(response.body.ok)
    .toBe(true)

  done()
})
