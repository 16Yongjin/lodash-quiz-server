const { Router } = require('express')
const { game } = require('./game')

const router = new Router()

router.get('/rooms', (req, res) => {
  console.log({ rooms: game.rooms.list })
  res.send({ rooms: game.rooms.list })
})

module.exports = router
