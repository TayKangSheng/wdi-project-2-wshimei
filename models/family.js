const mongoose = require('mongoose')

var FamilySchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Family name required']},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Family'},
  users: [{type: String}]
})

var Family = mongoose.model('Family', FamilySchema)

module.exports = Family
