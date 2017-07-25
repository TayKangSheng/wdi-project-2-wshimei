const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
// const passport = require('passport')

// blocked those who are logged in
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated() === false) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'You are already logged in'
  })
  return res.redirect('/categories/list')
}

router.get('/signup', isLoggedIn, userController.new)
router.post('/signup', isLoggedIn, userController.create)
router.get('/login', isLoggedIn, userController.loginPage)
router.post('/login', isLoggedIn, userController.login)
router.get('/logout', userController.logout)

module.exports = router
