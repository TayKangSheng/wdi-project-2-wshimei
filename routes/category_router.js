const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category_controller')

router.get('/new', categoryController.new)
router.post('/new', categoryController.create)
router.get('/list', categoryController.list)
router.get('/:id', categoryController.show)
router.get('/:id/edit', categoryController.edit)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router
