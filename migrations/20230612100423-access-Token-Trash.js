
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('accessTokensTrash');
  },

  async down(queryInterface) {
    await queryInterface.dropTable('accessTokensTrash');
  }
};
