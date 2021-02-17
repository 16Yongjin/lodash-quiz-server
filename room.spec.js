const { Game } = require('./room')

describe('User Join Room', () => {
  let game = new Game()

  beforeEach(() => {
    game = new Game()
  })

  it('one user should join room', () => {
    const roomId = '123'
    const username = 'user777'
    game.userJoinRoom({ roomId, username })

    expect(game.getRoom(roomId).users).toContain(username)
    expect(game.getUser(username).roomId).toEqual(roomId)
  })

  it('multiple users should join room', () => {
    const roomId = '123'
    const usernames = ['user1', 'user2', 'user3']

    usernames.forEach((username) => {
      game.userJoinRoom({ roomId, username })
    })

    usernames.forEach((username) => {
      expect(game.getRoom(roomId).users).toContain(username)
      expect(game.getUser(username).roomId).toEqual(roomId)
    })
  })
})

describe('User Leave Room', () => {
  let game = new Game()

  beforeEach(() => {
    game = new Game()
  })

  it('multiple users should join and leave room', () => {
    const roomId = '123'
    const usernames = ['user1', 'user2', 'user3']

    usernames.forEach((username) => {
      game.userJoinRoom({ roomId, username })
    })

    usernames.forEach((username) => {
      expect(game.getRoom(roomId).users).toContain(username)
      expect(game.getUser(username).roomId).toEqual(roomId)
    })

    usernames.forEach((username) => {
      game.userLeaveRoom(username)
    })

    usernames.forEach((username) => {
      expect(game.getUser(username).roomId).toEqual(null)
    })

    expect(game.getRoom(roomId).users).toHaveLength(0)
  })
})

describe('Game Status', () => {
  let game = new Game()

  beforeEach(() => {
    game = new Game()
  })

  it('start a game', () => {
    const roomId = '123'
    const usernames = ['user1', 'user2', 'user3']

    usernames.forEach((username) => {
      game.userJoinRoom({ roomId, username })
    })

    game.startGame(roomId)

    expect(game.getRoom(roomId).inProgress).toEqual(true)
    usernames.forEach((username) => {
      expect(game.getUser(username).finished).toEqual(false)
    })
  })

  it('end a game', () => {
    const roomId = '123'
    const usernames = ['user1', 'user2', 'user3']

    usernames.forEach((username) => {
      game.userJoinRoom({ roomId, username })
    })

    game.startGame(roomId)

    game.endGame(roomId)

    expect(game.getRoom(roomId).inProgress).toEqual(false)
  })

  it('one user finish a game', () => {
    const roomId = '123'
    const usernames = ['user1', 'user2', 'user3']

    usernames.forEach((username) => {
      game.userJoinRoom({ roomId, username })
    })

    game.startGame(roomId)
    game.userFinishGame(usernames[0])
    expect(game.getUser(usernames[0]).finished).toEqual(true)
    expect(game.getUser(usernames[0]).score).toBeGreaterThan(0)
  })
})
