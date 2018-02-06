'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var accountRoute = require('./routes/account')
var accountCharacter = require('./routes/character')
var app = express()
var PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/account', accountRoute)
app.use('/character', accountCharacter)
app.listen(PORT, () => {
  console.log('Behaviour server listening on port %s.', PORT)
})
