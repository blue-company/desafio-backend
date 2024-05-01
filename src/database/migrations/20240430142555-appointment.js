'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Appointments',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        reason: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        appointment_date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        appointment_time: {
          allowNull: false,
          type: Sequelize.TIME,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: 'SCHEDULED',
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        is_consulted: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { underscored: true }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Appointments');
  },
};
