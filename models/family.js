const mongoose = require('mongoose')

var FamilySchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Family name required']},
  creator: String,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

var Family = mongoose.model('Family', FamilySchema)

module.exports = Family
