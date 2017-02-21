const Item = require('../models/item')

let itemController = {
  list: (req, res) => {
    Item.find({}, function (err, output) {
      if (err) {
        return err
      }
      res.render('items/create')
    })
  },

  create: (req, res) => {
    Item.create({
      name: req.body.name,
      count: req.body.count,
      budget: req.body.budget,
      remark: req.body.remark
    }, function (err, output) {
      if (err) {
        console.error(err)
        return
      }
      res.redirect('/')
    })
  },

  show: (req, res) => {
    Item.findById(req.params.id, function (err, output) {
      if (err) {
        return err
      }
      res.redirect('/')
    })
  }
}

module.exports = itemController
