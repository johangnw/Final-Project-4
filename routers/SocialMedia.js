const router = require('express').Router();
const SocialMediaController = require('../controllers/SocialMediaController.js');
const { authenticate } = require('../middleware/Authentication.js');

router.post('/', authenticate, SocialMediaController.add)
router.get('/', authenticate, SocialMediaController.getAll)
router.put('/:socialMediaId', authenticate, SocialMediaController.edit)
router.delete('/:socialMediaId', authenticate, SocialMediaController.delete)


module.exports = router;