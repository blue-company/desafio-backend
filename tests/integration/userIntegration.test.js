const app = require('../../src/app');
const request = require('supertest');
const { CREATED, OK_STATUS, BAD_REQUEST, CONFLICT } = require('../../src/utils/statusCode');
const db = require('../../src/database/models/index');

describe('Users integration test', () => {
  beforeAll(async () => {
    await db.sequelize.sync();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  describe('POST /users', () => {
    it('should fail with a bad request if one of the fields is wrong', async () => {
      const mockUserData = {
        fullName: 'New User',
        email: 'incorrectEmail',
        password: 'password123',
        phonenumber: '123456789012',
        birthDate: '1985-01-01',
      };

      const response = await request(app).post('/users').send(mockUserData);

      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body).toHaveProperty('message', '"email" must be a valid email');
    });

    it('should create a new user and return a token', async () => {
      const mockUserData = {
        fullName: 'New User',
        email: 'test@example.com',
        password: 'password123',
        phonenumber: '123456789012',
        birthDate: '1985-01-01',
      };

      const response = await request(app).post('/users').send(mockUserData);

      expect(response.status).toBe(CREATED);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 409 status code if user already exists', async () => {
      const mockUserData = {
        fullName: 'New User',
        email: 'test@example.com',
        password: 'password123',
        phonenumber: '123456789012',
        birthDate: '1985-01-01',
      };

      const response = await request(app).post('/users').send(mockUserData);

      expect(response.status).toBe(CONFLICT);
      expect(response.body).toHaveProperty('message', 'User already registered');
    });
  });

  describe('POST /users/login', () => {
    it('should fail with a bad request if one of the fields is wrong', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'pass',
      };

      const response = await request(app).post('/users/login').send(mockUserData);

      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body).toHaveProperty(
        'message',
        '"password" length must be at least 6 characters long'
      );
    });

    it('should fail with a bad request if the email or password is wrong', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'incorrectPassword',
      };

      const response = await request(app).post('/users/login').send(mockUserData);

      expect(response.status).toBe(BAD_REQUEST);
      expect(response.body).toHaveProperty('message', 'Invalid fields');
    });

    it('should login the user and return a token', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/users/login').send(mockUserData);

      expect(response.status).toBe(OK_STATUS);
      expect(response.body).toHaveProperty('token');
    });
  });
});
