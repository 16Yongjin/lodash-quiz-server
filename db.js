const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
  /** @type {{ input: string, output: string, answer: string }[]} */
  quizzes: [
    {
      input: `['a', 'b', 'c', 'd']`,
      output: `[['a', 'b'], ['c', 'd']]`,
      answer: `_.chunk(['a', 'b', 'c', 'd'], 2);`,
    },
  ],
  /** @type {Record<string, { users: string[], state: string, dueDate: Date }>} */
  rooms: {},
  /** @type {{ name: string, score: number, room: string, finished: boolean }[]} */
  users: [],
}).write()

module.exports = db
