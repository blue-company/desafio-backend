'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phonenumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
