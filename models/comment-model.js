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

const CommentPath = sequelize.define('comments_path', {
    ancestor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descendant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path_length: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false
  });

  CommentPath.belongsTo(Comment, {
    foreignKey: 'ancestor'
  });

  CommentPath.belongsTo(Comment, {
    foreignKey: 'descendant'
  });


module.exports = {
  Comment,
  CommentPath
};
