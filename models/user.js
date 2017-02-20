const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  email: {type: String, require: true},
  nickname: {type: String, require: true},
  password: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User
