const router = require('express').Router();
const PhotoController = require('../controllers/photocontroller');
const { authenticate } = require('../middleware/authentication');

router.post('/', authenticate ,PhotoController.add);
router.get('/', authenticate ,PhotoController.getAll);
router.put('/:photoId', authenticate ,PhotoController.edit);
router.delete('/:photoId', authenticate ,PhotoController.delete);




module.exports = router;