'use strict';

const md5 = require('md5');
const { userId1, userId2 } = require('../helpers/uuidSeeder');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: userId1,
          full_name: 'John Doe',
          email: 'johndoe@test.com',
          password: md5('123456'),
          phonenumber: '071934567890',
          birth_date: '1990-01-01',
        },
        {
          id: userId2,
          full_name: 'Jane Doe',
          email: 'janedoe@test.com',
          password: md5('123321'),
          phonenumber: '071934567891',
          birth_date: '1990-01-02',
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
