const mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Category name required']},
  // color: String,
  family: {type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true},
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: [true, 'Please pick items']}]
})

var Category = mongoose.model('Category', CategorySchema)

module.exports = Category
