'use strict';

const { v4: uuidv4 } = require('uuid');
const { userId1, userId2 } = require('../helpers/uuidSeeder');
const { generateAppointmentToken } = require('../../utils/appointmentToken');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Appointments',
      [
        {
          id: uuidv4(),
          user_id: userId1,
          reason: 'Regular checkup',
          appointment_date: new Date('2024-06-30'),
          appointment_time: '14:00',
          encryptedToken: generateAppointmentToken(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          user_id: userId2,
          reason: 'Mental health',
          appointment_date: new Date('2024-07-30'),
          appointment_time: '15:00',
          encryptedToken: generateAppointmentToken(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Appointments', null, {});
  },
};
