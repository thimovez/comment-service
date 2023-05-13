'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.removeColumn('commentsPath', 'id');
  },

  async down(queryInterface) {
    queryInterface.addColumn('commentsPath', 'id');
  }
};
