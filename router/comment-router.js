const Router = require('express');
const commentController = require('../controllers/comment-controller');
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware');

router.post('/', authMiddleware, commentController.create);
// router.get('/read/:id', commentController.read);
// router.put('/update', commentController.update);
// router.post('/delete', commentController.delete);

module.exports = router;