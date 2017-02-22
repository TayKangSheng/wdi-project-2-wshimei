const Item = require('../models/item')
const Category = require('../models/category')

let itemController = {
  new: (req, res, next) => {
    Category.find({}, function (err, foundCategories) {
      if (err) {
        return next(err)
      }
      res.render('items/add', {allCategories: foundCategories})
    })
  },

  create: (req, res, next) => {
    Item.create({
      name: req.body.name,
      count: req.body.count,
      budget: req.body.budget,
      remark: req.body.remark
    }, function (err, createdItem) {
      if (err) {
        return next(err)
      }
      console.log(createdItem)
      var requestId = req.body.id
      Category.findById(req.body.id, function (err, foundCat) {
        if (err) throw err
        foundCat.items.push(createdItem)
        
        console.log(foundCat.items)
      })

      res.redirect('/categories/list')
    })
  },

  show: (req, res, next) => {
    Item.findById(req.params.id, function (err, output) {
      if (err) {
        return next(err)
      }
      res.render('items/show', {item: output})
    })
  }
}

module.exports = itemController
