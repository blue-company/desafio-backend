const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phonenumber: Joi.string().min(12).max(12).required(),
  birthDate: Joi.date().required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(errorFunction(400, error.message));

  return next();
};
