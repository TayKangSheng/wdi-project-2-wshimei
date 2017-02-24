const Item = require('../models/item')
const Category = require('../models/category')

let itemController = {
  new: (req, res, next) => {
    Category.find({}, function (err, foundCategories) {
      if (err) {
        return next(err)
      }
      res.render('items/add', {
        allCategories: foundCategories,
        flash: req.flash('flash')[0]
      })
    })
  },

  create: (req, res, next) => {
    Item.create({
      name: req.body.name,
      quantity: req.body.quantity,
      budget: req.body.budget,
      remark: req.body.remark
    }, function (err, createdItem) {
      if (err) {
        if (err.name === 'ValidationError') {
          let errMessages = []
          for (field in err.errors) {
            errMessages.push(err.errors[field].message)
          }
          console.log(errMessages)
          req.flash('flash', {
            type: 'danger',
            message: errMessages
          })
          res.redirect('/items/add')
        }

        return next(err)
      }

      Category.findByIdAndUpdate(req.body.id, {$push: {'items': createdItem}}, function (err) {
        if (err) {
          return next(err)
        }
      })

      res.redirect('/categories/' + req.body.id)
    })
  },

  show: (req, res, next) => {
    Item.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('items/show', {item: output})
    })
  },

  edit: (req, res, next) => {
    Item.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('items/edit', {foundItemId: output})
    })
  },

  update: (req, res, next) => {
    Item.findOneAndUpdate(req.params.id, {
      name: req.body.name,
      quantity: req.body.quantity,
      budget: req.body.budget,
      remark: req.body.remark,
      status: req.body.status
    },
      {
        new: true
      },
      function (err, foundItem) {
        if (err) {
          return next(err)
        }
        res.redirect('/items/' + foundItem.id)
      })
  },

  status: (req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, {
      status: req.query.status
    }, function (err, output) {
      if (err) {
        return next(err)
      }
      res.redirect('back')
    })
  },

  delete: (req, res, next) => {
    Item.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }

      req.flash('flash', {
        type: 'warning',
        message: 'Deleted an item'
      })
      res.redirect('/categories/list')
    })
  }
}

module.exports = itemController
