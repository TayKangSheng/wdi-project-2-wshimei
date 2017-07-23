const express = require('express')
const router = express.Router()

const familyController = require('../controllers/family_controller')

router.get('/new', familyController.new)
router.post('/new', familyController.create)
router.get('/list', familyController.list)
router.get('/:id', familyController.show)
router.get('/:id/edit', familyController.edit)
router.put('/:id', familyController.update)
router.delete('/:id', familyController.delete)
router.get('/:id/addMember', familyController.members)
router.post('/:id/addMember', familyController.addMember)

module.exports = router
