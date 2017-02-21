var passport = require('passport')
require('../config/passportConfig')
var User = require('../models/user')
const express = require('express')
const router = express.Router()

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
