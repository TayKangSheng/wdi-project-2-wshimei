const express = require('express')
const router = express.Router()

const userController = require('../controllers/user_controller')

router.get('/new', userController.new)

module.exports = router
