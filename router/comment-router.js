'use strict';
const Router = require('express');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware,
  upload.single('file'), commentController.createComment);
router.post('/sort', authMiddleware, commentController.sortParentComments);

module.exports = router;
