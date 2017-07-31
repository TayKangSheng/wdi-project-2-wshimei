const User = require('../models/user')
const Family = require('../models/family')
const passport = require('passport')
require('../config/passportConfig')

let userController = {
  new: (req, res, next) => {
    // return res.send(req.flash('errors'))
    res.render('users/signup')
  },

  create: (req, res, next) => {
    var loginStrategy = passport.authenticate('local-signup', {
      successRedirect: '/families/list',
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
      successRedirect: '/families/list',
      failureRedirect: '/users/login'
    })
    return loginStrategy(req, res)
  },

  logout: (req, res, next) => {
    req.logout()
    res.redirect('/')
  },

  show: (req, res, next) => {
    User.findById(req.user.id)
        .populate('family')
        .exec(function (err, output) {
          if (err) res.send(err)

          res.render('users/profile', {
            user: output
          })
        })
  }
}

module.exports = userController
