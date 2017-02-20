const express = require('express')
const router = express.Router()

const userController = require('../controllers/user_controller')

router.get('/new', userController.list)
router.post('/new', userController.create)
// router.get('/:id', userController.show)

module.exports = router
