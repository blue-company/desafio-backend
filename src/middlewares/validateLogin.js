const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(errorFunction(400, error.message));

  return next();
};
