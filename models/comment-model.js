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
  }
  });

const CommentPath = sequelize.define('comment_path', {
  ancestor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'comment',
      key: 'id'
    }
  },
  descendant: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'comment',
      key: 'id'
    }
  },
  path_length: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  }, { 
    timestamps: false,
  });

Comment.hasMany(CommentPath);
CommentPath.belongsTo(Comment);

module.exports = Comment;
