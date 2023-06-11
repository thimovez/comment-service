'use strict';
const jwt = require('jsonwebtoken');
const { Token } = require('../models');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '2h'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    });

    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(userData);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return tokenData;
    }

    const token = await Token.create({ refreshToken, userId });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });

    return tokenData;
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });

    return tokenData;
  }

  pushAccessTokenToTrash(accessToken) {
    /*
      Проверить валиден ли токен, если да то отравить в помойку
    */
    return accessToken;
  }

  findAccessToken(accessToken) {
    /*
      Ищем токен в базе если есть то доступ запрещен по этому токену
     */
    return accessToken;
  }

  countAccessTokensInTrash() {
    /*
      Считать количество токенов в базе данных
      и если условно их больше 5 начинать их удалять
    */
    return '';
  }

  deleteAccessTokenInTrash() {
    /*
      Перед тем как удалить - проверить валиден ли токен
      если да, игнорируем если нет, то удаляем
    */
    return '';
  }
}

module.exports = new TokenService();
