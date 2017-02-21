var passport = require('passport')
require('../config/passportConfig')
const User = require('../models/user')

let userController = {
  list: (req, res, next) => {
    User.find({}, function (err, output) {
      if (err) {
        return err
      }
      res.render('users/signup')
    })
  },

  create: (req, res, next) => {
    User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: User.encrypt(req.body.password)
    }, function (err, output) {
      if (err) {
        console.log('An error occurred: ' + err)
        res.redirect('/')
      // } else {
      //   passport.authenticate('local', {
      //     successRedirect: '/'
      //   })(req, res)
      }
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, function (err, output) {
      if (err) {
        return err
      }
      res.render('users/show')
    })
  },

  listOne: (req, res, next) => {
    User.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('users/show')
    })
  }
}

module.exports = userController
