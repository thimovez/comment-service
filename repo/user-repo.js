const { User } = require('../models');

class UserRepo {
  async createUser(id, name, email, hashPassword) {
    return await User.create({
      id, firsName: name, email, password: hashPassword
    });
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async getUserById(id) {
    return await User.findOne({ where: { id } });
  }
}

module.exports = new UserRepo();
