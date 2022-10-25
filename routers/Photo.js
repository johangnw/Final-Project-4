const router = require('express').Router();
const PhotoController = require('../controllers/PhotoController');
const { authenticate } = require('../middleware/Authentication');

router.post('/', authenticate ,PhotoController.add);
router.get('/', authenticate ,PhotoController.getAll);
router.put('/:photoId', authenticate ,PhotoController.edit);
router.delete('/:photoId', authenticate ,PhotoController.delete);




module.exports = router;