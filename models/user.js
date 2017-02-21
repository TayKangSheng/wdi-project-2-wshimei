const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  local: {
    email: {type: String, require: [true, 'Email required.']},
    nickname: {type: String, require: [true, 'Please provide a nickname.']},
    password: {type: String, require: [true, 'Password required']}
  }
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.password)
}

var User = mongoose.model('User', UserSchema)

module.exports = User
