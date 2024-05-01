const md5 = require('md5');
const { User } = require('../database/models');
const errorFunction = require('../utils/errorFunction');
const { CONFLICT, BAD_REQUEST } = require('../utils/statusCode');

const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== md5(password)) throw errorFunction(BAD_REQUEST, 'Invalid fields');

  return user.id;
};

const create = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (user) throw errorFunction(CONFLICT, 'User already registered');

  const encryptedPassword = md5(password);
  const userToCreate = {
    ...userData,
    password: encryptedPassword,
  };

  const userCreated = User.create(userToCreate);

  return userCreated.id;
};

const getById = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) throw errorFunction(BAD_REQUEST, 'User not found');

  return user;
};

module.exports = {
  login,
  create,
  getById,
};
