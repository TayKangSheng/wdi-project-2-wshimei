const User = require('../models/user')
const passport = require('passport')
require('../config/passportConfig')

let userController = {
  new: (req, res, next) => {
    res.render('users/signup', {
      flash: req.flash('flash')[0]
    })
  },
  create: (req, res, next) => {
    User.create({
      local: {
        email: req.body.email,
        nickname: req.body.nickname,
        password: User.encrypt(req.body.password)
      },
      function (err, output) {
        if (err) {
          return next(err)
        }
        res.redirect('/')
      }
    })
  },
  loginPage: (req, res, next) => {
    res.render('users/login')
  },
  login: (req, res, next) => {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
    return loginStrategy(req, res)
  }
}

module.exports = userController
