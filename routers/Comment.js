const router = require('express').Router();
const { authenticate } = require('../middleware/Authentication');
const CommentController = require('../controllers/CommentController');

router.post('/', authenticate, CommentController.add);
router.put('/:commentId', authenticate, CommentController.edit);
router.get('/', authenticate, CommentController.getAll);
router.delete('/:commentId', authenticate, CommentController.delete);

module.exports = router;