const express = require('express')
const moment = require('moment')
const SimpleOAuth2 = require('simple-oauth2')

const router = express.Router()

const credentials = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    authorizePath: '/oauth2/authorize',
    tokenHost: process.env.GATEKEEPER_URL,
    tokenPath: '/oauth2/token'
  }
}

const oauth2 = SimpleOAuth2.create(credentials)

const scopes = process.env.SCOPES.split(',')

router.get('/', async (req, res, next) => {
  res.render('index')
})

router.get('/login-with-bitcointrade', async (req, res, next) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: scopes,
    state: moment.utc().unix().toString()
  })

  res.redirect(authorizationUri)
})

router.get('/code', async (req, res, next) => {
  res.render('code', {
    code: req.query.code,
    error: req.query.error,
    error_description: req.query.error_description
  })
})

router.post('/login', async (req, res, next) => {
  try {
    const result = await oauth2.authorizationCode.getToken({
      code: req.body.code,
      client_id: credentials.client.id,
      client_secret: credentials.client.secret
    })
    const accessToken = oauth2.accessToken.create(result)

    res.status(accessToken && accessToken.token && accessToken.token.error ? 400 : 200)
    res.json(accessToken.token)
  } catch (error) {
    console.log('Access Token Error', error.message)

    res.status(400)
    res.json({ error: error.message })
  }
})

router.post('/refresh', async (req, res, next) => {
  try {
    let accessToken = oauth2.accessToken.create({
      access_token: req.body.access_token,
      refresh_token: req.body.refresh_token,
      expires_in: req.body.expires_in
    })

    accessToken = await accessToken.refresh({
      client_id: credentials.client.id,
      client_secret: credentials.client.secret,
      scope: req.body.scope
    })

    res.status(accessToken && accessToken.token && accessToken.token.error ? 400 : 200)
    res.json(accessToken.token)
  } catch (error) {
    console.log('Access Token Error', error.message)

    res.status(400)
    res.json({ error: error.message })
  }
})

module.exports = router
