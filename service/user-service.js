// const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api.error');
const db = require('../db');

class UserService {
  async registration(name, email, password) {
    const candidate = await db.query(`SELECT email FROM users WHERE email = $1`, [email]);
    if(typeof candidate.rows[0] !== 'undefined') {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await db.query(`INSERT INTO users (name, email, password)
                                    VALUES ($1, $2, $3) 
                                    RETURNING name, email`, 
                                    [name, email, hashPassword]);
    
    const userDto = new UserDto({name: name, email: email});
    const tokens = tokenService.generateTokens({...userDto});
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: newUser
    }
  }

  // async login(email, password) {
  //   const user = await UserModel.findOne({email})
  //   if(!user) {
  //     throw ApiError.BadRequest('Пользователь с таким имейлом не найден');
  //   }
  //   const usPassEquals = await bcrypt.compare(password, user.password);
  //   if(!usPassEquals) {
  //     throw ApiError.BadRequest('Пароль неверный');
  //   }
  //   const userDto = new UserDto(user);
  //   const tokens = tokenService.generateTokens({...userDto});

  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);
  //   return {
  //     ...tokens,
  //     user: userDto
  //   }
  // }

  // async logout(refreshToken) {
  //   const token = await tokenService.removeToken(refreshToken);
  //   return token;
  // }

  // async refresh(refreshToken) {
  //   if (!refreshToken) {
  //     throw ApiError.UnauthorizedError();
  //   }
  //   const userData = tokenService.validateRefreshToken(refreshToken);
  //   const tokenFromDb = await tokenService.findToken(refreshToken);
  //   if(!userData || !tokenFromDb) {
  //     throw ApiError.UnauthorizedError();
  //   }
  //   const user = await UserModel.findById(userData.id);
  //   const userDto = new UserDto(user);
  //   const tokens = tokenService.generateTokens({...userDto});

  //   await tokenService.saveToken(userDto.id, tokens.refreshToken);
  //   return {
  //     ...tokens,
  //     user: userDto
  //   }
  // }

  // async getAllUsers() {
  //   const users = await UserModel.find();
  //   return users;
  // }
}

module.exports = new UserService();
