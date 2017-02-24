const mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Category name required']},
  color: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: [true, 'Please pick a category']}]
})

var Category = mongoose.model('Category', CategorySchema)

module.exports = Category
