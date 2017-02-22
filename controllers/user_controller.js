// const User = require('../models/user')
const passport = require('passport')
require('../config/passportConfig')

let userController = {
  new: (req, res, next) => {
    res.render('users/signup', {
      flash: req.flash('flash')[0]
    })
  },
  create: (req, res, next) => {
    var loginStrategy = passport.authenticate('local-signup', {
      successRedirect: '/categories/list',
      failureRedirect: '/users/signup',
      failureFlash: true
    })
    return loginStrategy(req, res)
  },
  loginPage: (req, res, next) => {
    res.render('users/login', {
      flash: req.flash('flash')[0]
    })
  },
  login: (req, res, next) => {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/categories/list',
      failureRedirect: '/users/login',
      failureFlash: true
    })
    return loginStrategy(req, res)
  }
}

module.exports = userController
