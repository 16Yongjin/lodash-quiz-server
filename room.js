const { quizzes } = require('./quiz')

class User {
  constructor({ name }) {
    this.name = name
    this.score = 0
    this.finished = false
    /** @type {string} */
    this.roomId = null
    this.answer = ''
  }

  /** @param {string} roomId */
  setRoom(roomId) {
    if (this.roomId !== roomId) this.resetScore()
    this.roomId = roomId
  }

  startGame() {
    this.finished = false
    this.answer = ''
  }

  endGame() {}

  /** @param {string} answer */
  finishGame(answer) {
    this.finished = true
    this.answer = answer
  }

  resetScore() {
    this.score = 0
  }

  /** @param {number} score */
  addScore(score) {
    this.score += score
  }
}

class Users {
  constructor() {
    /** @type {Record<string, User>} */
    this.users = {}
  }

  addUser(name) {
    if (!this.users[name]) this.users[name] = new User({ name })
    return this.users[name]
  }

  /** @param {string} name */
  getUser(name) {
    return this.addUser(name)
  }

  /** @param {string[]} names */
  getUsers(names) {
    return names.map((name) => this.getUser(name))
  }

  setUserRoom({ username, roomId }) {
    const user = this.getUser(username)
    user.roomId = roomId
  }

  /** @param {string[]} usernames */
  startGame(usernames) {
    this.getUsers(usernames).forEach((user) => user.startGame())
  }

  /** @param {string[]} usernames */
  endGame(usernames) {
    this.getUsers(usernames).forEach((user) => user.endGame())
  }

  toJSON() {
    const { users } = this
    return { users }
  }
}

class Room {
  constructor({ id }) {
    this.id = id
    this.users = []
    this.dueDate = new Date('2000')
    this.quizIndex = -1
  }

  get inProgress() {
    return this.dueDate.getTime() > new Date().getTime()
  }

  get completed() {
    return this.quizIndex >= quizzes.length
  }

  /** @param {string} username */
  addUser(username) {
    if (this.users.includes(username)) return
    this.users.push(username)
  }

  /** @param {string} username */
  removeUser(username) {
    this.users = this.users.filter((name) => name !== username)
  }

  startGame() {
    if (this.inProgress) return

    this.dueDate = new Date(new Date().getTime() + 3 * 60 * 1000)
    this.quizIndex += 1
  }

  endGame() {
    this.dueDate = new Date('2000')
  }

  toJSON() {
    const { id, users, dueDate, inProgress, completed, quizIndex } = this
    return { id, users, dueDate, inProgress, completed, quizIndex }
  }
}

class Rooms {
  constructor() {
    /** @type {Record<string, Room>} */
    this.rooms = {}
  }

  get list() {
    return Object.values(this.rooms).map((room) => room.toJSON())
  }

  addRoom(id) {
    if (!this.rooms[id]) this.rooms[id] = new Room({ id })
    return this.rooms[id]
  }

  getRoom(id) {
    return this.addRoom(id)
  }

  addUserToRoom({ roomId, username }) {
    this.getRoom(roomId).addUser(username)
  }

  removeUserFromRoom({ roomId, username }) {
    this.getRoom(roomId).removeUser(username)
  }

  startGame(roomId) {
    this.getRoom(roomId).startGame()
  }

  endGame(roomId) {
    this.getRoom(roomId).endGame()
  }
}

class Game {
  constructor() {
    this.users = new Users()
    this.rooms = new Rooms()
  }

  userJoinRoom({ roomId, username }) {
    this.rooms.addUserToRoom({ roomId, username })
    this.users.setUserRoom({ roomId, username })
  }

  /** @param {string} username */
  userLeaveRoom(username) {
    const { roomId } = this.users.getUser(username)
    this.users.setUserRoom({ roomId: null, username })
    if (roomId) this.rooms.removeUserFromRoom({ roomId, username })
  }

  /** @param {string} roomId */
  getRoom(roomId) {
    return this.rooms.getRoom(roomId)
  }

  /** @param {string} username */
  getUser(username) {
    return this.users.getUser(username)
  }

  /** @param {string} roomId */
  startGame(roomId) {
    this.rooms.startGame(roomId)
    this.users.startGame(this.rooms.getRoom(roomId).users)
  }

  /** @param {string} roomId */
  endGame(roomId) {
    this.rooms.endGame(roomId)
    this.users.endGame(this.rooms.getRoom(roomId).users)
  }

  /** @param {{ username: string, answer: string, giveUp: true }} param0 */
  userFinishGame({ username, answer, giveUp }) {
    const user = this.getUser(username)
    user.finishGame(answer)
    if (giveUp) return
    const room = this.getRoom(user.roomId)
    if (room.inProgress) {
      const leftTime = room.dueDate.getTime() - new Date().getTime()
      const score = Math.max(~~(leftTime / 1000), 0)
      user.addScore(score)
    }
  }

  /** @param {string} roomId */
  getGameInfo(roomId) {
    const room = this.getRoom(roomId).toJSON()
    return {
      ...room,
      users: this.users.getUsers(room.users),
      quiz: quizzes[room.quizIndex],
    }
  }
}

module.exports = { Game, Users, User, Room, Rooms }
