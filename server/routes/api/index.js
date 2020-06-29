const login = require('./login')
const me = require('./me')
const movies = require('./movies')
const crawl = require('./crawl')
const enqueue = require('./enqueue')
const stream = require('./stream')
const streamInfo = require('./stream-info')

module.exports = {
  login,
  me,
  movies,
  crawl,
  enqueue,
  stream,
  streamInfo
}