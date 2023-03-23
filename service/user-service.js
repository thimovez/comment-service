// const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
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

    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await db.query(`INSERT INTO users (id, name, email, password)
                                    VALUES ($1, $2, $3, $4) 
                                    RETURNING id, name, email`, 
                                    [id, name, email, hashPassword]);

    const userDto = new UserDto(newUser.rows[0]);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: newUser
    }
  }

  async login(email, password) {
    const user = await db.query(`SELECT id, name, email, password 
                                 FROM users 
                                 WHERE email = $1`,
                                 [email]);
                                 
    if(typeof user.rows[0] === 'undefined') {
      throw ApiError.BadRequest('User with this email address not found');
    }

    const userData = user.rows[0]

    const usPassEquals = await bcrypt.compare(password, userData.password);
    if(!usPassEquals) {
      throw ApiError.BadRequest('You have entered an incorrect password.');
    }

    const userDto = new UserDto({id: userData.id,
                                 name: userData.name,
                                 email: userData.email
                                });

    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

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
