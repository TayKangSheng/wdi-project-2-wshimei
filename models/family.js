const mongoose = require('mongoose')

var FamilySchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Family name required']},
  main: String,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'Family'}]
})

var Family = mongoose.model('Family', FamilySchema)

module.exports = Family
