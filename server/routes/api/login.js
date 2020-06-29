const jwt = require('jsonwebtoken')
const sanitizeAccount = require('../../helpers/sanitize-account')
const insecureCookieOpts = { maxAge: 1000 * 60 * 60 }

module.exports = async (context, req, res) => {
  const { Errors } = context
  try {
    const { query } = context
    const { email, password} = req.body

    const results = await query(`SELECT * FROM accounts WHERE email = '${email}'`)
    const account = {...results[0]}
    account.users = await query(`SELECT id, name, avatar FROM users WHERE account_id = ${account.id}`)

    if (account.password !== password) {
      throw Errors.InvalidCredentials
    }

    const sanitizedAccount = sanitizeAccount(account)
    jwt.sign(sanitizedAccount, 'secret', (err, token) => {
      if (err) {
        throw Errors.InternalServerError
      }

      res.cookie('token', token, insecureCookieOpts).status(200).json({ payload: sanitizedAccount })
    })
  } catch (ex) {
    console.log(ex)
    return res.status(200).json({ errors: [ex] })
  }
}