'use strict';
const userService = require('../service/user-service');

class UserController {

  async registrarion(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.registration(name, email, password);

      res.cookie('refreshToken', newUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
      });

      res.json(newUser);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new UserController();
