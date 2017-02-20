const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  name: {type: String, require: true},
  count: Number,
  budget: Number,
  remark: String
})

var Item = mongoose.model('Item', ItemSchema)

module.exports = Item
