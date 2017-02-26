const Category = require('../models/category')
const Item = require('../models/item')

let categoryController = {
  new: (req, res, next) => {
    res.render('categories/new', {
      flash: req.flash('flash')[0]
    })
  },

  create: (req, res, next) => {
    Category.create({
      name: req.body.name
      // color: req.body.color
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
    Category.find(function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('categories/list', {
        categories: output,
        flash: req.flash('flash')[0]
      })
    })
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
      console.log(output.id)
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
        console.log(updatedCat)

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
