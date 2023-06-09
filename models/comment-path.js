const { Model } = require('sequelize');

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
        foreignKey: 'ancestor', onDelete: 'CASCADE'
      });
      CommentPath.belongsTo(models.Comment, {
        foreignKey: 'descendant', onDelete: 'CASCADE'
      });
    }
  }
  CommentPath.init({
    ancestor: DataTypes.INTEGER,
    descendant: DataTypes.INTEGER,
    pathLength: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    tableName: 'commentsPath',
    modelName: 'CommentPath',
  });
  return CommentPath;
};
