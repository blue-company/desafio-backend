const app = require('../../src/app');
const request = require('supertest');
const {
  CREATED,
  OK_STATUS,
  BAD_REQUEST,
  UNAUTHORIZED,
  NO_CONTENT,
  FORBIDDEN,
} = require('../../src/utils/statusCode');
const db = require('../../src/database/models/index');

describe('Appointments integration tests', () => {
  let token;
  let appointmentLink;
  let appointmentId;

  beforeAll(async () => {
    await db.sequelize.sync();

    const response = await request(app).post('/users/login').send({
      email: 'johndoe@test.com',
      password: '123456',
    });
    token = response.body.token;
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /appointments', () => {
    it('should handle missing required fields', async () => {
      const appointmentData = {
        appointmentDate: '2024-05-20',
        appointmentTime: '10:00',
      };

      const response = await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${token}`)
        .send(appointmentData);
      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body).toHaveProperty('message', '"reason" is required');
    });

    it('should handle invalid data', async () => {
      const appointmentData = {
        reason: 'Test Appointment',
        appointmentDate: 'invalid-date',
        appointmentTime: '10:00',
      };

      const response = await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${token}`)
        .send(appointmentData);
      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body).toHaveProperty(
        'message',
        '"appointmentDate" must be of format YYYY-MM-DD'
      );
    });

    it('should create a new appointment', async () => {
      const appointmentData = {
        reason: 'Test Appointment',
        appointmentDate: '2024-05-20',
        appointmentTime: '10:00',
      };

      const response = await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${token}`)
        .send(appointmentData);
      expect(response.status).toBe(CREATED);
      expect(response.body).toHaveProperty('urlLink');
      expect(response.body).toHaveProperty('appointmentId');
      appointmentLink = response.body.urlLink;
      appointmentId = response.body.appointmentId;
    });
  });

  describe('GET /appointments/:token', () => {
    it('should handle invalid tokens', async () => {
      const invalidToken = 'invalid-token';

      const invalidTokenResponse = await request(app)
        .get(`/appointments/${invalidToken}`)
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(invalidTokenResponse.status).toBe(UNAUTHORIZED);
      expect(invalidTokenResponse.body).toHaveProperty('message', 'Expired or invalid token');
    });

    it('should get the appointment PDF file', async () => {
      jest.setTimeout(20000);
      const response = await request(app)
        .get(appointmentLink.replace('http://localhost:3000', ''))
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(OK_STATUS);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.headers['content-disposition']).toMatch(
        /^attachment; filename=consulta_[a-zA-Z0-9-]+\.pdf$/
      );
    });
  });

  describe('PUT /appointments/:id', () => {
    it('should update an existing appointment', async () => {
      const updatedAppointmentData = {
        reason: 'Updated Appointment',
        appointmentDate: '2024-06-02',
        appointmentTime: '14:00',
      };

      const response = await request(app)
        .put(`/appointments/${appointmentId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedAppointmentData);

      expect(response.status).toBe(OK_STATUS);
      expect(response.body).toHaveProperty('urlLink');
    });

    it('should handle updating an appointment that does not belong to the user', async () => {
      const { body } = await request(app).post('/users/login').send({
        email: 'janedoe@test.com',
        password: '123321',
      });
      invalidToken = body.token;

      const updatedAppointmentData = {
        reason: 'Updated Appointment',
        appointmentDate: '2024-06-02',
        appointmentTime: '14:00',
      };

      const response = await request(app)
        .put(`/appointments/${appointmentId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(updatedAppointmentData);
      expect(response.status).toBe(FORBIDDEN);
      expect(response.body).toHaveProperty(
        'message',
        'You do not have permission to update this appointment'
      );
    });
  });

  describe('DELETE /appointments/:id', () => {
    it('should cancel an existing appointment', async () => {
      const response = await request(app)
        .delete(`/appointments/${appointmentId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(NO_CONTENT);
    });
  });
});
