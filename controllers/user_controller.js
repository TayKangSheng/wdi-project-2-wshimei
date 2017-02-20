const express = require('express')
const router = express.Router()

const User = require('../models/user')

let userController = {
  list: (req, res) => {
    User.find({}, function (err, output) {
      if (err) {
        return err
      }
      res.render('signup')
    })
  },

  create: (req, res) => {
    User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password
    }, function (err, output) {
      if (err) {
        console.error(err)
        return
      }
      res.render('signup')
    })
  // },
  //
  // show: (req, res) => {
  //   User.findById(req.params.id, function (err, output) {
  //     if (err) {
  //       return err
  //     }
  //     res.render('show')
  // })
  }
}

module.exports = userController
