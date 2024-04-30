const crypto = require('crypto');

function generateAppointmentToken() {
  return crypto.randomBytes(16).toString('hex');
}

function encryptToken(token) {
  const cipher = crypto.createCipheriv('aes192', process.env.ENCRYPTION_KEY || 's3cr3t');
  let encryptedToken = cipher.update(token, 'utf8', 'hex');
  encryptedToken += cipher.final('hex');

  return encryptedToken;
}

function decryptToken(encryptedToken) {
  const decipher = crypto.createDecipheriv('aes192', process.env.ENCRYPTION_KEY || 's3cr3t');
  let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');

  return decryptedToken;
}

module.exports = {
  generateAppointmentToken,
  encryptToken,
  decryptToken,
};
