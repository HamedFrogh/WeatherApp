
const UserController = require('../controllers/userController')
const { Router } = require('express');
const router = Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router