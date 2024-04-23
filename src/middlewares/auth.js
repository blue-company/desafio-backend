const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    const error = new Error('Usuário não autenticado.');
    error.statusCode = 401;
    throw error;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error('Token de acesso inválido.');
      error.statusCode = 403;
      throw error;
    }
    req.user = user;
    next();
  });
};

module.exports = auth;
