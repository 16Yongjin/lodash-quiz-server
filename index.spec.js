const app = require('./app.js')
const request = require('supertest')

describe('GET /quiz', () => {
  xit('should get quiz', async () => {
    const response = await request(app).get('/quiz')
    expect(response.status).toEqual(200)
  })
})

describe('POST /quiz', () => {
  xit('should save quiz', async () => {
    const response = await request(app)
      .post('/quiz')
      .send({
        input: `['a', 'b', 'c', 'd']`,
        output: `[['a', 'b'], ['c', 'd']]`,
        answer: `_.chunk(['a', 'b', 'c', 'd'], 2);`,
      })
      .expect(200)

    expect(response.body.message).toEqual('ok')
  })
})
