const { Appointment } = require('../../src/database/models');
const { NOT_FOUND, FORBIDDEN } = require('../../src/utils/statusCode');
const userService = require('../../src/services/userService');
const appointmentService = require('../../src/services/appointmentService');

jest.mock('../../src/database/models');
jest.mock('../../src/services/userService');

describe('Appointment service', () => {
  describe('create', () => {
    it('should create a new appointment and return the encrypted token', async () => {
      const appointmentData = {
        reason: 'Test Appointment',
        appointmentDate: '2024-05-20',
        appointmentTime: '10:00',
      };
      const userId = 'user123';

      Appointment.create.mockResolvedValue({ dataValues: { id: 'appointment123' } });

      const encryptedToken = await appointmentService.create(appointmentData, userId);

      expect(encryptedToken).toBeDefined();
      expect(Appointment.create).toHaveBeenCalledWith({
        ...appointmentData,
        token: expect.any(String),
        userId,
      });
    });
  });

  describe('getAppointment', () => {
    const token =
      '590f5e3730425ca5d31a2d8b4f557c1002817a0fe57ee044303822b4df9e4588ae6038c53be5ea1ff69d2aac594b4874';
    it('should throw an error if the appointment is not found', async () => {
      Appointment.findOne.mockResolvedValue(null);
      let error;
      try {
        await appointmentService.getAppointment(token);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(NOT_FOUND);
      expect(error.message).toBe('Appointment not found');
    });

    it('should throw an error if the appointment has already been consulted', async () => {
      Appointment.findOne.mockResolvedValue({ isConsulted: true });
      let error;
      try {
        await appointmentService.getAppointment(token);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(FORBIDDEN);
      expect(error.message).toBe('Appointment already consulted');
    });
  });

  describe('update', () => {
    const appointmentId = 'invalidAppointment123';
    const appointmentData = {
      reason: 'Updated Appointment',
      appointmentDate: '2024-06-02',
      appointmentTime: '14:00',
    };
    const userId = 'user123';

    it('should update the appointment and return the encrypted token', async () => {
      Appointment.update.mockResolvedValue({});
      Appointment.findOne.mockResolvedValue({ userId });

      const encryptedToken = await appointmentService.update(
        appointmentId,
        appointmentData,
        userId
      );

      expect(encryptedToken).toBeDefined();
      expect(Appointment.update).toHaveBeenCalledWith(
        {
          ...appointmentData,
          token: expect.any(String),
          isConsulted: false,
        },
        { where: { id: appointmentId } }
      );
    });

    it('should throw an error if the appointment is not found', async () => {
      Appointment.findOne.mockResolvedValue(null);
      let error;
      try {
        await appointmentService.update(appointmentId, appointmentData, userId);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(NOT_FOUND);
      expect(error.message).toBe('Appointment not found');
    });

    it('should throw an error if the user does not have permission to update the appointment', async () => {
      const appointmentId = 'appointment123';
      const appointmentData = {
        reason: 'Updated Appointment',
        appointmentDate: '2024-06-02',
        appointmentTime: '14:00',
      };
      const userId = 'invalidUser123';

      Appointment.findOne.mockResolvedValue({ userId: 'user123' });
      let error;
      try {
        await appointmentService.update(appointmentId, appointmentData, userId);
      } catch (err) {
        error = err;
      }

      expect(error.status).toBe(FORBIDDEN);
      expect(error.message).toBe('You do not have permission to update this appointment');
    });
  });

  describe('cancel', () => {
    const appointmentId = 'appointment123';
    const userId = 'user123';

    it('should cancel the appointment', async () => {
      Appointment.findOne.mockResolvedValue({ userId });

      await appointmentService.cancel(appointmentId, userId);

      expect(Appointment.update).toHaveBeenCalledWith(
        { status: 'CANCELED' },
        { where: { id: appointmentId } }
      );
    });
  });
});
