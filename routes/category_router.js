const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category_controller')

router.get('/', categoryController.list)
router.post('/', categoryController.create)

module.exports = router
