const User = require('../models/user')

let userController = {
  list: (req, res) => {
    User.find({}, function (err, output) {
      if (err) {
        return err
      }
      res.render('users/signup')
    })
  },

  create: (req, res) => {
    User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: User.encrypt(req.body.password)
    }, function (err, output) {
      if (err) {
        console.error(err)
        return
      }
      res.redirect('/')
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, function (err, output) {
      if (err) {
        return err
      }
      res.render('users/show')
    })
  }
}

module.exports = userController
