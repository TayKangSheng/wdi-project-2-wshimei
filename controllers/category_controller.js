const Category = require('../models/category')

let categoryController = {
  list: (req, res) => {
    Category.find({}, function (err, output) {
      if (err) {
        return err
      }
      res.render('categories/list')
    })
  },

  create: (req, res) => {
    Category.create({
      name: req.body.name,
      color: req.body.color
    }, function (err, output) {
      if (err) {
        console.error(err)
        return
      }
      res.redirect('/')
    })
  }
}

module.exports = categoryController
