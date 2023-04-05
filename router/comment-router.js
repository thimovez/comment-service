const Router = require('express');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');

router.post('/', authMiddleware, commentController.createComment);
router.get('/get', authMiddleware, commentController.getAllParentComments);
router.post('/sort', authMiddleware, commentController.sortParentComments);

module.exports = router;
