'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentPath extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentPath.belongsTo(models.Comment, {
        foreignKey: 'descendant'
      });
    }
  }
  CommentPath.init({
    ancestor: DataTypes.INTEGER,
    descendant: DataTypes.INTEGER,
    path_length: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentPath',
  });
  return CommentPath;
};