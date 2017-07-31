const Category = require('../models/category')
const Family = require('../models/family')
const User = require('../models/user')
// const Item = require('../models/item')

let categoryController = {
  new: (req, res, next) => {
    User
    .findById(req.user.id)
    .populate('family')
    .exec(function (err, data) {
      if (err) return res.send('err')

      res.render('categories/new', {
        user: data,
        flash: req.flash('flash')[0]
      })
    })
  },

  create: (req, res, next) => {
    Category.create({
      name: req.body.name,
      // color: req.body.color
      family: req.body.family
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
          res.redirect('/categories/new')
        }
        return next(err)
      }
      res.redirect('/categories/' + output.id)
    })
  },

  list: (req, res, next) => {
    if (req.user.family.length > 1) {
      // for (var i = 0; i < res.locals.user.family.length; i++) {
      Category.find({})
              .populate('family')
              .exec(function (err, output) {
                if (err) {
                  return next(err)
                }
                res.render('categories/list', {
                  categories: output,
                  flash: req.flash('flash')[0]
                })
              })
      // }
    } else {
      Category.find({family: req.user.family}, function (err, output) {
        if (err) {
          return next(err)
        }
        res.render('categories/list', {
          categories: output,
          flash: req.flash('flash')[0]
        })
      })
    }
  },

  show: (req, res, next) => {
    Category.findById(req.params.id)
            .populate('items')
            .exec(function (err, output) {
              if (err) {
                return next(err)
              }

              res.render('categories/show', {
                category: output,
                flash: req.flash('flash')[0]
              })
            })
  },

  edit: (req, res, next) => {
    Category.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('categories/edit', {category: output})
    })
  },

  update: (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name
      // color: req.body.color
    },
      {
        new: true
      },
      function (err, updatedCat) {
        if (err) {
          return next(err)
        }

        res.redirect('/categories/' + updatedCat.id)
      })
  },

  delete: (req, res, next) => {
    Category.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      req.flash('flash', {
        type: 'warning',
        message: 'Deleted a category'
      })
      res.redirect('/categories/list')
    })
  }
}

module.exports = categoryController
