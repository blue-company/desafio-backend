const userController = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');
const { CREATED, OK_STATUS } = require('../../src/utils/statusCode');
const generateJwtToken = require('../../src/utils/generateJwtToken');

jest.mock('../../src/services/userService');
jest.mock('../../src/utils/generateJwtToken');

describe('userController', () => {
  describe('login', () => {
    it('should call userService.login with req.body and return a token', async () => {
      const req = { body: { email: 'test@example.com', password: '321123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const userId = '123';
      const token = 'testToken';

      userService.login.mockResolvedValue(userId);
      generateJwtToken.mockReturnValue(token);

      await userController.login(req, res);

      expect(userService.login).toHaveBeenCalledWith(req.body);
      expect(generateJwtToken).toHaveBeenCalledWith(userId, req.body.email);
      expect(res.status).toHaveBeenCalledWith(OK_STATUS);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe('create', () => {
    it('should call userService.create with req.body and return a token', async () => {
      const req = {
        body: {
          fullName: 'New User',
          email: 'test@example.com',
          password: 'password123',
          phonenumber: '123456789012',
          birthDate: '1985-01-01',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const userId = '123';
      const token = 'testToken';

      userService.create.mockResolvedValue(userId);
      generateJwtToken.mockReturnValue(token);

      await userController.create(req, res);

      expect(userService.create).toHaveBeenCalledWith(req.body);
      expect(generateJwtToken).toHaveBeenCalledWith(userId, req.body.email);
      expect(res.status).toHaveBeenCalledWith(CREATED);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
