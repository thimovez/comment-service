const Router = require('express');
const router = new Router();
const userRouter = require('./user-routes');
const commentRouter = require('./comment-router');

router.use('/user', userRouter);
router.use('/comment', commentRouter);

module.exports = router;