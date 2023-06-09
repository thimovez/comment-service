
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      buffer: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface) {
    await  queryInterface.dropTable('files');
  }
};
