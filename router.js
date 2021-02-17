const { Router } = require('express')
const db = require('./db')
const { game } = require('./game')

const router = new Router()

router.get('/quiz', (req, res) => {
  res.send(db.get('quizzes').value())
})

router.post('/quiz', (req, res) => {
  db.get('quizzes').push(req.body).write()
  res.send({ message: 'ok' })
})

router.get('/rooms', (req, res) => {
  console.log({ rooms: game.rooms.list })
  res.send({ rooms: game.rooms.list })
})

module.exports = router
