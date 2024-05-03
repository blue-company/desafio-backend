const { INTERNAL_SERVER_ERROR } = require('../utils/statusCode');

// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  /* istanbul ignore next */
  return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
};
