const express = require('express')
const router = express.Router()

const userController = require('../controllers/user_controller')

router.get('/signup', userController.list)
router.post('/signup', userController.create)
router.get('/:id', userController.show)

module.exports = router
