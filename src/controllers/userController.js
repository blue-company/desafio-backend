const userService = require('../services/userService');
const { CREATED, OK_STATUS } = require('../utils/statusCode');
const generateJwtToken = require('../utils/generateJwtToken');

const login = async (req, res) => {
  const id = await userService.login(req.body);

  const { email } = req.body;

  const token = generateJwtToken(id, email);

  res.status(OK_STATUS).json({ token });
};

const create = async (req, res) => {
  const id = await userService.create(req.body);

  const { email } = req.body;

  const token = generateJwtToken(id, email);

  return res.status(CREATED).json({ token });
};

module.exports = {
  login,
  create,
};
