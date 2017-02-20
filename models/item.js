const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['bought', 'unbought'],
    default: 'unbought'
  },
  name: {type: String, require: true},
  count: {type: Number, require: true},
  budget: Number,
  remark: String
})

var Item = mongoose.model('Item', ItemSchema)

module.exports = Item
