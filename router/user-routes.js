const Router = require('express');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validate = require('../middleware/validation-middleware');
const { regUserRules } = require('../utils/validate-rules');
const router = new Router();

router.post('/registration',
  validate(regUserRules), userController.registrarion);
router.post('/login', userController.login);
router.get('/logout', authMiddleware, userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;
