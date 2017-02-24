const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  local: {
    email: {type: String, required: [true, 'Email required']},
    nickname: {type: String, required: [true, 'Please provide a nickname']},
    password: {type: String, required: [true, 'Password required']}
  },
  family: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.local.password)
}

var User = mongoose.model('User', UserSchema)

module.exports = User
