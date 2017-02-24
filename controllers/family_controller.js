const Family = require('../models/family')
const User = require('../models/user')

let familyController = {
  new: (req, res, next) => {
    res.render('families/new', {
      flash: req.flash('flash')[0]
    })
  },

  create: (req, res, next) => {
    Family.create({
      name: req.body.name,
      // main: req.locals.user,
      users: req.body.users
    }, function (err, output) {
      if (err) {
        if (err.name === 'ValidationError') {
          let errMessages = []
          for (field in err.errors) {
            errMessages.push(err.errors[field].message)
          }
          req.flash('flash', {
            type: 'danger',
            message: errMessages
          })
          res.redirect('/families/new')
        }
        return next(err)
      }
      res.redirect('/families/list')
    })
  },

  list: (req, res, next) => {
    Family.find(function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('families/list', {families: output})
    })
  },

  show: (req, res, next) => {
    Family.findById(req.params.id)
            .populate('users')
            .exec(function (err, output) {
              if (err) {
                return next(err)
              }

              res.render('families/show', {family: output})
            })
  },

  edit: (req, res, next) => {
    Family.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('families/edit', {familyId: output})
    })
  },

  update: (req, res, next) => {
    Family.findOneAndUpdate(req.params.id, {
      name: req.body.name,
      users: req.body.user
    },
      {
        new: true
      },
      function (err, updatedFam) {
        if (err) {
          return next(err)
        }
        res.redirect('/families/' + updatedFam.id)
      })
  },

  delete: (req, res, next) => {
    Family.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      req.flash('flash', {
        type: 'warning',
        message: 'Deleted a family'
      })
      res.redirect('/families/list')
    })
  }
}

module.exports = familyController
