const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  reason: Joi.string().required(),
  appointmentDate: Joi.string()
    .regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .messages({
      'string.pattern.base': '"appointmentDate" must be of format YYYY-MM-DD',
    }),
  appointmentTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': '"appointmentTime" must be of format HH:MM',
    }),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(errorFunction(400, error.message));

  return next();
};
