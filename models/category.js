const mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema({
  name: {type: String, require: true},
  color: String
})

var Category = mongoose.model('Category', CategorySchema)

module.exports = Category
