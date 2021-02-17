const app = require('./app')
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: true })
const { game } = require('./game')

server.listen(5000, () => {
  console.log('listen on port 5000')
})

const socketIdToUser = {}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)

  socket.on('LOBBY_JOIN', () => {
    console.log('lobby join')
    socket.join('LOBBY')
    socket.emit('ROOM_UPDATE', game.rooms.list)
  })

  socket.on('LOBBY_LEAVE', () => {
    socket.leave('LOBBY')
  })

  socket.on('ROOM_JOIN', ({ roomId, username }) => {
    console.log('user', username, 'joined room', roomId)
    socket.join(roomId)
    socketIdToUser[socket.id] = username
    game.userJoinRoom({ roomId, username })
    io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))
    io.to('LOBBY').emit('ROOM_UPDATE', game.rooms.list)
  })

  socket.on('ROOM_LEAVE', ({ roomId, username }) => {})

  socket.on('GAME_START', (roomId) => {
    game.startGame(roomId)
    const gameInfo = game.getGameInfo(roomId)
    io.to(roomId).emit('GAME_UPDATE', gameInfo)
    setTimeout(() => {
      io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))
    }, gameInfo.dueDate.getTime() - new Date().getTime())
  })

  socket.on('GAME_END', (roomId) => {
    game.endGame(roomId)
    io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))
  })

  socket.on('USER_GAME_FINISHED', ({ roomId, username, answer, giveUp }) => {
    game.userFinishGame({ username, answer, giveUp })

    const gameInfo = game.getGameInfo(roomId)
    const allUserFinished =
      gameInfo.inProgress && gameInfo.users.every((user) => user.finished)
    if (allUserFinished) {
      game.endGame(roomId)
    }
    io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))
  })

  socket.on('disconnect', () => {
    console.log('user', socketIdToUser[socket.id], 'disconnected')
    if (socketIdToUser[socket.id]) {
      const { roomId } = game.getUser(socketIdToUser[socket.id])
      game.userLeaveRoom(socketIdToUser[socket.id])
      if (roomId) io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))
    }
  })
})
