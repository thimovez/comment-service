const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');
const TokenModel = require('./token-model');
const Token = require('./token-model');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID, 
    primaryKey: true, 
    allowNull: false
  },
  firsName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
  }, { 
    tableName: 'users'
  });

User.hasOne(TokenModel);
Token.belongsTo(User);

module.exports = User;
