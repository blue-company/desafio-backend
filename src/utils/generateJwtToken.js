const jwt = require('jsonwebtoken');

module.exports = (userId, email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(
    { data: { userId, email } },
    process.env.JWT_SECRET || 's3cr3t',
    jwtConfig
  );

  return token;
};
