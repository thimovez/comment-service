'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const tokenService = require('./token-service');
const { User } = require('../models');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api.error');

class UserService {
  async registration(name, email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 3);

    const userData = await User.create({
      id, firsName: name, email, password: hashPassword
    }, { returning: ['id', 'firsName', 'email', 'createdAt' ] });
    const userDto = new UserDto(userData);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const user = {
      id: userData.id,
      name: userData.firsName,
      email: userData.email,
      createdAt: userData.createdAt
    };

    return {
      user,
      ...tokens
    };
  }

  async login(email, password) {
    const existUser = await User.findOne({ where: { email } });
    if (!existUser) {
      throw ApiError.BadRequest('User with this email address not found');
    }

    const usPassEquals = await bcrypt.compare(password, existUser.password);
    if (!usPassEquals) {
      throw ApiError.BadRequest('You have entered an incorrect password.');
    }

    const userDto = new UserDto(existUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const user = {
      id: userDto.id,
      name: userDto.firsName,
      email: userDto.email
    };

    return {
      user,
      ...tokens
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return {
      response: token
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const id = userData.id;
    const user = await User.findOne({ where: { id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      user: userDto,
      ...tokens
    };
  }

}

module.exports = new UserService();
