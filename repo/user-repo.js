const { User } = require('../models');
const ApiError = require('../exceptions/api.error');

class UserRepo {
  async createUser(id, name, email, hashPassword) {
    try {
      return await User.create({
        id, firsName: name, email, password: hashPassword
      });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }

  async getUserById(id) {
    try {
      return await User.findOne({ where: { id } });
    } catch (e) {
      throw ApiError.BadRequest(e);
    }
  }
}

module.exports = new UserRepo();
