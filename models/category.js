const mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema({
  name: {type: String, require: [true, 'Category name required.']},
  color: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

var Category = mongoose.model('Category', CategorySchema)

module.exports = Category
