const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const sanitizeAccount = require('./helpers/sanitize-account')

const Errors = require('./errors')
const insecureCookieOpts = { maxAge: 1000 * 60 * 60 }

const app = express()

app.use(bodyParser.json({}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/avatars', express.static(path.join(__dirname, 'data', 'avatars')))

const accounts = {
  'k.karsopawiro@gmail.com': {
    email: 'k.karsopawiro@gmail.com',
    password: 'Prolo757137',
    users: [
      {
        name: 'Kevin',
        avatar: 'http://localhost:3000/avatars/default/008.png'
      },
      {
        name: 'Rassana',
        avatar: 'http://localhost:3000/avatars/default/004.png'
      }
    ]
  }
}

app.post('/api/login', (req, res) => {
  const { email, password} = req.body
  
  if (!accounts.hasOwnProperty(email)) {
    return res.status(200).json({ errors: [Errors.InvalidCredentials] })
  }

  const account = accounts[email]
  if (account.password !== password) {
    return res.status(200).json({ errors: [Errors.InvalidCredentials] })
  }

  const sanitizedAccount = sanitizeAccount(account)
  jwt.sign(sanitizedAccount, 'secret', (err, token) => {
    if (err) {
      return res.status(200).json({ errors: [Errors.InternalServerError] })
    }

    res.cookie('token', token, insecureCookieOpts).status(200).json({ payload: sanitizedAccount })
  })
})

const protect = (req, res, next) => {
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

app.get('/api/logout', (req, res) => {
  res.clearCookie('token', insecureCookieOpts).status(200).json({})
})

app.get('/api/me', protect, (req, res) => {
  if (!req.account) {
    res.status(200).json({ errors: [Errors.Unauthorized] })
  }
  res.status(200).json({ payload: req.account })
})

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => {
  console.log('keflix.net listening on http://localhost:3000')
})