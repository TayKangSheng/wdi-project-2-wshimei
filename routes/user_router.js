const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
// const passport = require('passport')

router.get('/signup', userController.new)
router.post('/signup', userController.create)
router.get('/login', userController.loginPage)
router.post('/login', userController.login)

module.exports = router
