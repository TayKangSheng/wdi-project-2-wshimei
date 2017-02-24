const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['bought', 'unbought'],
    default: 'unbought'
  },
  name: {type: String, required: [true, 'Item name required']},
  quantity: {type: Number, required: [true, 'Quantity required']},
  budget: String,
  remark: String,
  category: String
})

var Item = mongoose.model('Item', ItemSchema)

module.exports = Item
