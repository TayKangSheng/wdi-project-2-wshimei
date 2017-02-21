const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

router.get('/', userController.list)

router.get('/new', userController.new)

router.get('/:id', userController.listOne)
ç
router.get('/:id/edit', userController.edit)

router.post('/', userController.create)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)

module.exports = router
