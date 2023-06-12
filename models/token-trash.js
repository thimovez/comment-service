const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenTrash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TokenTrash.init({
    accessTokens: {
      type: DataTypes.STRING()
    }
  }, {
    sequelize,
    tableName: 'accessTokensTrash',
    modelName: 'AccessTokensTrash',
  });
  return TokenTrash;
};
