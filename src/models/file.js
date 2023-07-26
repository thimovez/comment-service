const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.belongsTo(models.Comment, { foreignKey: 'commentId' });
    }
  }
  File.init({
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buffer: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      }
    }
  }, {
    sequelize,
    timestamps: false,
    tableName: 'files',
    modelName: 'File',
  });
  return File;
};
