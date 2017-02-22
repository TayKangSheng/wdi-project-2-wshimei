const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['bought', 'unbought'],
    default: 'unbought'
  },
  name: {type: String, require: [true, 'Item required.']},
  quantity: Number,
  budget: String,
  remark: String
})

var Item = mongoose.model('Item', ItemSchema)

module.exports = Item
