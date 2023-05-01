'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firsName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refreshToken: {
        type: Sequelize.STRING(260)
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('commentsPath', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ancestor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id'
        }
      },
      descendant: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id'
        }
      },
      pathLength: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropAllTables();
  }
};
