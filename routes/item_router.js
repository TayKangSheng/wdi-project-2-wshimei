const express = require('express')
const router = express.Router()

const itemController = require('../controllers/item_controller')

router.get('/create', itemController.list)
router.post('/create', itemController.create)
router.get('/:id', itemController.show)

module.exports = router
