const jwt = require('jsonwebtoken')
const Errors = require('../errors')

module.exports = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(200).json({ errors: [Errors.Unauthorized] })
  }

  jwt.verify(token, 'secret', (err, payload) => {
    if (err) {
      return res.status(200).json({ errors: [Errors.Unauthorized] })
    }
    req.account = payload
    next()
  })
}