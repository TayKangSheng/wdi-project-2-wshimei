const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category_controller')

router.get('/new', categoryController.new)
router.post('/new', categoryController.create)
router.get('/list', categoryController.list)
router.get('/list/:id', categoryController.show)

module.exports = router
