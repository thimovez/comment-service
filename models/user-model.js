const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');
const Token = require('./token-model');
const Comment = require('./comment-model');

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

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Comment, {foreignKey: 'parentId'});
Comment.belongsTo(User, {foreignKey: 'parentId'});


module.exports = User;
