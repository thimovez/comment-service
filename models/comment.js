const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.hasMany(models.CommentPath, {
        foreignKey: 'ancestor', onDelete: 'CASCADE'
      });
      Comment.hasMany(models.CommentPath, {
        foreignKey: 'descendant', onDelete: 'CASCADE'
      });
      Comment.hasOne(models.File, { foreignKey: 'commentId' });
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};
