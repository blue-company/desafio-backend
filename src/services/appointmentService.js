const { Appointment } = require('../database/models');
const {
  generateAppointmentToken,
  encryptToken,
  decryptToken,
} = require('../utils/appointmentToken');
const errorFunction = require('../utils/errorFunction');
const generatePDF = require('../utils/generatePdf');
const { NOT_FOUND, FORBIDDEN } = require('../utils/statusCode');
const userService = require('./userService');

const create = async (appointmentData, userId) => {
  const token = generateAppointmentToken();
  const appointment = await Appointment.create({ ...appointmentData, token, userId });
  const ecryptedToken = encryptToken(token);

  return { token: ecryptedToken, appointmentId: appointment.dataValues.id };
};

const getAppointment = async (token) => {
  const decryptedToken = decryptToken(token);
  const appointment = await Appointment.findOne({
    where: { token: decryptedToken, status: 'SCHEDULED' },
  });

  if (!appointment) {
    throw errorFunction(NOT_FOUND, 'Appointment not found');
  }
  if (appointment.isConsulted) {
    throw errorFunction(FORBIDDEN, 'Appointment already consulted');
  }

  const user = await userService.getById(appointment.userId);

  const pdfFile = await generatePDF(appointment, user);

  await Appointment.update({ isConsulted: true }, { where: { id: appointment.id } });

  return { pdfFile, appointmentId: appointment.id };
};

const update = async (appointmentId, appointmentData, userId) => {
  await validateAppointment(appointmentId, userId);

  const token = generateAppointmentToken();
  await Appointment.update(
    { ...appointmentData, token, isConsulted: false },
    { where: { id: appointmentId } }
  );
  const ecryptedToken = encryptToken(token);

  return ecryptedToken;
};

const cancel = async (appointmentId, userId) => {
  await validateAppointment(appointmentId, userId);
  await Appointment.update({ status: 'CANCELED' }, { where: { id: appointmentId } });
};

const validateAppointment = async (appointmentId, userId) => {
  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    throw errorFunction(NOT_FOUND, 'Appointment not found');
  }

  if (appointment.userId !== userId) {
    throw errorFunction(FORBIDDEN, 'You do not have permission to update this appointment');
  }
};

module.exports = {
  create,
  getAppointment,
  update,
  cancel,
};
