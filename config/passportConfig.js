var LocalStrategy = require('passport-local').Strategy
// var FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenPassword, done) {
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) {
        req.flash('errors', err)
        return done(err)
      }

      if (!foundUser) {
        return done(null, false, req.flash('errors', {
          type: 'warning',
          message: 'No user found by this email'
        }))
      }
      if (!foundUser.validPassword(givenPassword)) {
        return done(null, false, req.flash('errors', {
          type: 'danger',
          message: 'Access Denied. Password is wrong'
        }))
      }
      return done(err, foundUser)
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'local.email': email }, function (err, foundUser) {
      if (foundUser) {
        return done(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already in use'
        }))
      } else {
        let newUser = new User({
          local: {
            email: email,
            nickname: req.body.nickname,
            password: User.encrypt(password)
          }
        })
        newUser.save(function (err, newUser) {
          return done(null, newUser, req.flash('flash', {
            type: 'success',
            message: 'New User Created: ' + newUser.local.email
          }))
        })
      }
    })
  }))

  // passport.use('facebook', new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_API_KEY,
  //   clientSecret: process.env.FACEBOOK_API_SECRET,
  //   calbackURL: 'http://localhost:4000/callback',
  //   enableProof: true,
  //   profileFields: ['name', 'emails']
  // }, function (access_token, refresh_token, profile, next) {
  //   process.nextTick(function () {
  //
  //   })
  // }))
}
