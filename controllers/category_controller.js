const Category = require('../models/category')
// const Item = require('../models/item')

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
      res.redirect('/categories/list')
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
    Category.findById(req.params.id)
            .populate('item')
            .exec(function (err, output) {
              if (err) {
                return next(err)
              }

              res.render('categories/show', {category: output})
            })
  },

  edit: (req, res, next) => {
    Category.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('categories/edit', {categoryId: output})
    })
  },

  update: (req, res, next) => {
    Category.findOneAndUpdate(req.params.id, {
      name: req.body.name,
      color: req.body.color
    }, function (err, updatedCat) {
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
        message: 'Deleted an animal'
      })
      res.redirect('/categories/list')
    })
  }
}

module.exports = categoryController
