const Router = require('express');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const router = new Router();

router.post('/registration', userController.registrarion);
router.post('/login', userController.login);
router.get('/logout', authMiddleware, userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;
