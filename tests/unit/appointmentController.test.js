const appointmentService = require('../../src/services/appointmentService');
const { CREATED, OK_STATUS, NO_CONTENT } = require('../../src/utils/statusCode');
const appointmentController = require('../../src/controllers/appointmentController');
const stream = require('stream');

jest.mock('../../src/services/appointmentService');

describe('Appointment Controller', () => {
  describe('create', () => {
    it('should create a new appointment and return the URL link', async () => {
      const req = {
        user: { userId: 'user123' },
        body: { appointmentData: 'data' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const token = 'token123';
      const appointmentId = 'appointment123';

      appointmentService.create.mockResolvedValue({ token, appointmentId });

      await appointmentController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(CREATED);
      expect(res.json).toHaveBeenCalledWith({
        urlLink: `http://localhost:3000/appointments/${token}`,
        appointmentId,
      });
    });
  });

  describe('getAppointment', () => {
    it('should get the appointment PDF file and send it as a response', async () => {
      const req = {
        params: { token: 'token123' },
      };
      const res = new stream.PassThrough();
      res.setHeader = jest.fn();
      const pdfFile = 'pdfFileData';
      const appointmentId = 'appointment123';

      appointmentService.getAppointment.mockResolvedValue({ pdfFile, appointmentId });

      await appointmentController.getAppointment(req, res);

      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Disposition',
        `attachment; filename=consulta_${appointmentId}.pdf`
      );
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    });
  });

  describe('update', () => {
    it('should update an appointment and return the URL link', async () => {
      const req = {
        params: { id: 'appointment123' },
        user: { userId: 'user123' },
        body: { updatedData: 'data' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const token = 'token123';

      appointmentService.update.mockResolvedValue(token);

      await appointmentController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(OK_STATUS);
      expect(res.json).toHaveBeenCalledWith({
        urlLink: `http://localhost:3000/appointments/${token}`,
      });
    });
  });

  describe('cancel', () => {
    it('should cancel an appointment and return a no content response', async () => {
      const req = {
        params: { id: 'appointment123' },
        user: { userId: 'user123' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await appointmentController.cancel(req, res);

      expect(res.status).toHaveBeenCalledWith(NO_CONTENT);
      expect(res.end).toHaveBeenCalled();
    });
  });
});
