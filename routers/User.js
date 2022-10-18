const router = require('express').Router();


router.post('/register');
router.post('/login');
router.put('/:userId');
router.delete('/:userId');

module.exports = router;