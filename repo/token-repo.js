const { Token } = require('../models');

class TokenRepo {
  async createRefreshToken(refreshToken, userId) {
    return await Token.create({ refreshToken, userId });
  }

  async getRefreshToken(refreshToken) {
    return await Token.findOne({ where: { refreshToken } });
  }

  async getRefreshTokenByUserId(userId) {
    return await Token.findOne({ where: { userId } });
  }

  async updateInstance(instance) {
    return await instance.save();
  }

  async deleteRefreshToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }
}

module.exports = new TokenRepo();
