const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const tokenService = require('./token-service');
const {User} = require('../models');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api.error');

class UserService {
  async registration(name, email, password) {
    const candidate = await User.findOne({where: {email}});
    if(candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({id: id, firsName: name, email: email, password: hashPassword})
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: user
    }
  }
  
  async login(email, password) {
    const user = await User.findOne({where: {email}});
    if(!user) {
      throw ApiError.BadRequest('User with this email address not found');
    }

    const usPassEquals = await bcrypt.compare(password, user.password);
    if(!usPassEquals) {
      throw ApiError.BadRequest('You have entered an incorrect password.');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const userId = userData.id; 
    const user = await User.findOne({where: {userId}});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

}

module.exports = new UserService();
