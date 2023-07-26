const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const tokenService = require('./token-service');
const userRepo = require('../repo/user-repo');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api.error');

class UserService {
  async registration(name, email, password) {
    const candidate = await userRepo.getUserByEmail(email);
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exist`);
    }

    const id = uuidv4();
    const hashPassword = await bcrypt.hash(password, 3);

    const userData = await userRepo.createUser(id, name, email, hashPassword);
    const userDto = new UserDto(userData);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

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
    const existUser = await userRepo.getUserByEmail(email);
    if (!existUser) {
      throw ApiError.BadRequest('User with this email address not found');
    }

    const usPassEquals = await bcrypt.compare(password, existUser.password);
    if (!usPassEquals) {
      throw ApiError.BadRequest('You have entered an incorrect password.');
    }

    const userDto = new UserDto(existUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

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
    await tokenService.deleteRefreshToken(refreshToken);

    return {
      response: 'user logout'
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const id = userData.id;
    const user = userRepo.getUserById(id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens
    };
  }

}

module.exports = new UserService();
