const request = require('supertest')

const server = require('../main')

afterEach(() => {
  server.close()
})

test('获取一言', async () => {
  const response = await request(server)
    .get('/api/v1/hitokoto')

  expect(response.body.ok)
    .toBe(true)
})
