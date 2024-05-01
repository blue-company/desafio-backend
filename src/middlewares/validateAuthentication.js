const jwt = require('jsonwebtoken');
const errorFunction = require('../utils/errorFunction');
const { UNAUTHORIZED } = require('../utils/statusCode');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(errorFunction(UNAUTHORIZED, 'Token not found'));

  try {
    const finalToken = token.split(' ')[1];
    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET || 's3cr3t');

    req.user = decoded.data;

    return next();
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return next(errorFunction(UNAUTHORIZED, 'Expired or invalid token'));
  }
};
