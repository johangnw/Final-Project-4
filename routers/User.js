const router = require('express').Router();
const { authenticate } = require('../middleware/authentication');
const UserController = require('../controllers/usercontroller');

router.post('/register',UserController.register);
router.post('/login',UserController.login);

router.use(authenticate);
router.put('/:userId',UserController.edit);
router.delete('/:userId',UserController.delete);

module.exports = router;