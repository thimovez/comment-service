const { Token } = require('../models');
const ApiError = require('../exceptions/api.error');

class TokenRepo {
  async createRefreshToken(refreshToken, userId, transaction) {
    try {
      return await Token.create({ refreshToken, userId }, { transaction });
    } catch (e) {
      throw new ApiError.BadRequest(e);
    }
  }

  async getRefreshToken(refreshToken) {
    try {
      return await Token.findOne({ where: { refreshToken } });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async getRefreshTokenByUserId(userId) {
    try {
      return await Token.findOne({ where: { userId } });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async updateInstance(instance) {
    try {
      return await instance.save();
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async deleteRefreshToken(refreshToken) {
    try {
      return await Token.destroy({ where: { refreshToken } });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }
}

module.exports = new TokenRepo();
