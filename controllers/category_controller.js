const Category = require('../models/category')

let categoryController = {
  new: (req, res, next) => {
    res.render('categories/new')
  },

  create: (req, res, next) => {
    Category.create({
      name: req.body.name,
      color: req.body.color
    }, function (err, output) {
      if (err) {
        return next(err)
      }
      res.redirect('categories/list')
    })
  },

  list: (req, res, next) => {
    Category.find(function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('categories/list', {categories: output})
    })
  },

  show: (req, res, next) => {
    Category.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('categories/show', {category: output})
    })
  }
}

module.exports = categoryController
