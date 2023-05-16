'use strict';
const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const upload = require('../middleware/file-middleware');
const commentController = require('../controllers/comment-controller');

router.post('/', authMiddleware, upload, commentController.createComment);
router.post('/:id', authMiddleware, upload, commentController.createReply);
router.post('/sort', authMiddleware, commentController.sortParentComments);
router.get('/:id', authMiddleware, commentController.getTreeOfComments);
router.get('/', commentController.getParentComments);
router.delete('/delete/:id', authMiddleware, commentController.deleteComments);

module.exports = router;
