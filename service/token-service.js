const jwt = require('jsonwebtoken');
// const tokenModel = require('../models/token-model');
const db = require('../db');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    return {
      accessToken,
      refreshToken
    }
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
  
  async saveToken(userId, refreshToken) {
    const tokenData = await db.query(`SELECT refreshToken FROM tokens WHERE id = $1`, [userId]);
    if (typeof tokenData === 'undefined' || tokenData) {
        const token = await db.query(`UPDATE tokens SET refreshToken = $1 RETURNING refreshToken`, [refreshToken]);
        return token.rows[0];
    }
    
    return tokenData;
  }

//   async removeToken(refreshToken) {
//     const tokenData = await tokenModel.deleteOne({refreshToken});
//     return tokenData;
//   }

//   async findToken(refreshToken) {
//     const tokenData = await tokenModel.findOne({refreshToken});
//     return tokenData;
//   }
}

module.exports = new TokenService();