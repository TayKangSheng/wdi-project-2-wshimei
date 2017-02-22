const express = require('express')
const router = express.Router()

const itemController = require('../controllers/item_controller')

router.get('/add', itemController.new)
router.post('/add', itemController.create)
router.get('/:id', itemController.show)

module.exports = router
