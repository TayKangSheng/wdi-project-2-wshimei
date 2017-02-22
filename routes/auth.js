const passport = require('passport')
require('../config/passportConfig')
const express = require('express')
const router = express.Router()

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
