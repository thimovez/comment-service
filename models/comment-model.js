const sequelize = require('../database/db');
const {DataTypes} = require('sequelize');

const Comment = sequelize.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  indentLevel: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
  });


module.exports = Comment;
