const jwt = require('jsonwebtoken');
const tokenRepo = require('../repo/token-repo');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION
    });

    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

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

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await tokenRepo.getRefreshTokenByUserId(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenRepo.updateInstance(tokenData);
      return tokenData;
    }

    const token = await tokenRepo.createRefreshToken(refreshToken, userId);

    return token;
  }

  async deleteRefreshToken(refreshToken) {
    const tokenData = tokenRepo.deleteRefreshToken(refreshToken);

    return tokenData;
  }

  async findRefreshToken(refreshToken) {
    const tokenData = tokenRepo.getRefreshToken(refreshToken);

    return tokenData;
  }
}

module.exports = new TokenService();
