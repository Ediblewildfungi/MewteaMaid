const request = require('supertest')

const app = require('../main')

test('金蝶暖暖', async (done) => {
  const response = await request(app.callback())
    .get('/api/v1/ffxiv/fashionReport')

  expect(response.body.ok)
    .toBe(true)

  expect(response.body.data)
    .toHaveProperty('answer.head')

  expect(response.body.data)
    .toHaveProperty('answer.coat')

  expect(response.body.data)
    .toHaveProperty('answer.hand')

  expect(response.body.data)
    .toHaveProperty('answer.leg')

  expect(response.body.data)
    .toHaveProperty('answer.foot')

  expect(response.body.data)
    .toHaveProperty('answer.earring')

  expect(response.body.data)
    .toHaveProperty('answer.necklace')

  expect(response.body.data)
    .toHaveProperty('answer.bracelet')

  expect(response.body.data)
    .toHaveProperty('answer.ring')

  done()
})
