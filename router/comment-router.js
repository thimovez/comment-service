const Router = require('express');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'img', maxCount: 1 }]);

router.post('/', authMiddleware, cpUpload, commentController.createComment);
router.post('/sort', authMiddleware, commentController.sortParentComments);

module.exports = router;
