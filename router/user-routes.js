'use strict';
const Router = require('express');
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/registration', userController.registrarion);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;
