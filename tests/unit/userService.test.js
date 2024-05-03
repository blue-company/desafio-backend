const userService = require('../../src/services/userService');
const { User } = require('../../src/database/models');
const { CONFLICT, BAD_REQUEST } = require('../../src/utils/statusCode');
const md5 = require('md5');

jest.mock('../../src/database/models');
jest.mock('md5', () => jest.fn());

describe('User service', () => {
  describe('login', () => {
    it('should return user id if login is successful', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(user);
      md5.mockReturnValue('password123');

      const result = await userService.login(userData);

      expect(result).toBe(user.id);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(md5).toHaveBeenCalledWith(userData.password);
    });

    it('should throw an error if login fails', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      User.findOne.mockResolvedValue(null);
      let error;
      try {
        await userService.login(userData);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(BAD_REQUEST);
      expect(error.message).toBe('Invalid fields');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
    });
  });

  describe('create', () => {
    it('should create a new user and return the user id', async () => {
      const userData = {
        fullName: 'New User',
        email: 'test@example.com',
        password: 'password123',
        phonenumber: '123456789012',
        birthDate: '1985-01-01',
      };
      const hashedPassword = md5('password123');
      const user = {
        id: 1,
        fullName: 'New User',
        email: 'test@example.com',
        password: hashedPassword,
        phonenumber: '123456789012',
        birthDate: '1985-01-01',
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({ dataValues: user });

      const result = await userService.create(userData);

      expect(result).toBe(user.id);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(User.create).toHaveBeenCalledWith({ ...userData, password: hashedPassword });
      expect(md5).toHaveBeenCalledWith(userData.password);
    });

    it('should throw an error if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      User.findOne.mockResolvedValue(user);
      let error;
      try {
        await userService.create(userData);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(CONFLICT);
      expect(error.message).toBe('User already registered');
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
    });
  });

  describe('getById', () => {
    it('should return the user with the specified id', async () => {
      const userId = 1;
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      User.findByPk.mockResolvedValue(user);

      const result = await userService.getById(userId);

      expect(result).toBe(user);
      expect(User.findByPk).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if user is not found', async () => {
      const userId = 1;

      User.findByPk.mockResolvedValue(null);
      let error;
      try {
        await userService.getById(userId);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(BAD_REQUEST);
      expect(error.message).toBe('User not found');
      expect(User.findByPk).toHaveBeenCalledWith(userId);
    });
  });
});
