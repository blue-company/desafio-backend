const appointmentService = require('../services/appointmentService');
const { CREATED, OK_STATUS, NO_CONTENT } = require('../utils/statusCode');
const stream = require('stream');

const create = async (req, res) => {
  const { userId } = req.user;
  const { token, appointmentId } = await appointmentService.create(req.body, userId);

  const urlLink = `http://localhost:3000/appointments/${token}`;

  res.status(CREATED).json({ urlLink, appointmentId });
};

/* istanbul ignore next */
const getAppointment = async (req, res) => {
  const { token } = req.params;

  const { pdfFile, appointmentId } = await appointmentService.getAppointment(token);
  const fileContents = Buffer.from(pdfFile, 'base64');

  const readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.setHeader('Content-Disposition', `attachment; filename=consulta_${appointmentId}.pdf`);
  res.setHeader('Content-Type', 'application/pdf');

  readStream.pipe(res);
};

const update = async (req, res) => {
  const { id: appointmentId } = req.params;
  const { userId } = req.user;
  const token = await appointmentService.update(appointmentId, req.body, userId);

  const urlLink = `http://localhost:3000/appointments/${token}`;

  res.status(OK_STATUS).json({ urlLink });
};

const cancel = async (req, res) => {
  const { id: appointmentId } = req.params;
  const { userId } = req.user;
  await appointmentService.cancel(appointmentId, userId);

  res.status(NO_CONTENT).end();
};

module.exports = {
  create,
  getAppointment,
  update,
  cancel,
};
