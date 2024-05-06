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
          id: '16fa7484-d7ab-42b3-b9c0-2896cc1ba523',
          user_id: userId1,
          reason: 'Check-up de rotina',
          appointment_date: new Date('2024-06-30'),
          appointment_time: '14:00',
          token: generateAppointmentToken(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '51e65d1f-06b0-4491-a6cc-ba5c32952dd1',
          user_id: userId2,
          reason: 'Saúde mental',
          appointment_date: new Date('2024-07-30'),
          appointment_time: '15:00',
          token: generateAppointmentToken(),
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
