const app = require('./app')
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: true })
const { game } = require('./game')

server.listen(5000, () => {
  console.log('listen on port 5000')
})

const socketIdToUser = {}
const updateLobby = () => io.to('LOBBY').emit('ROOM_UPDATE', game.rooms.list)
const updateRoom = (roomId) =>
  io.to(roomId).emit('GAME_UPDATE', game.getGameInfo(roomId))

io.on('connection', (socket) => {
  socket.on('LOBBY_JOIN', () => {
    socket.join('LOBBY')
    socket.emit('ROOM_UPDATE', game.rooms.list)
  })

  socket.on('LOBBY_LEAVE', () => {
    socket.leave('LOBBY')
  })

  socket.on('ROOM_JOIN', ({ roomId, username }) => {
    socket.join(roomId)
    socketIdToUser[socket.id] = username
    game.userJoinRoom({ roomId, username })
    updateRoom(roomId)
    updateLobby()
  })

  socket.on('ROOM_LEAVE', ({ roomId, username }) => {
    game.userLeaveRoom(username)
    updateRoom(roomId)
    updateLobby()
  })

  socket.on('GAME_START', (roomId) => {
    game.startGame(roomId)
    const gameInfo = game.getGameInfo(roomId)
    io.to(roomId).emit('GAME_UPDATE', gameInfo)
    setTimeout(() => {
      updateRoom(roomId)
    }, gameInfo.dueDate.getTime() - new Date().getTime())
  })

  socket.on('GAME_END', (roomId) => {
    game.endGame(roomId)
    updateRoom(roomId)
  })

  socket.on('USER_GAME_FINISHED', ({ roomId, username, answer, giveUp }) => {
    game.userFinishGame({ username, answer, giveUp })

    const gameInfo = game.getGameInfo(roomId)
    const allUserFinished =
      gameInfo.inProgress && gameInfo.users.every((user) => user.finished)
    if (allUserFinished) {
      game.endGame(roomId)
    }
    updateRoom(roomId)
  })

  socket.on('disconnect', () => {
    if (socketIdToUser[socket.id]) {
      const { roomId } = game.getUser(socketIdToUser[socket.id])
      game.userLeaveRoom(socketIdToUser[socket.id])
      if (roomId) updateRoom(roomId)
      updateLobby()
    }
  })
})
