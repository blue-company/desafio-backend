const crypto = require('crypto');

const secret = process.env.ENCRYPTION_KEY || 's3cr3t';
const key = crypto.createHash('sha256').update(String(secret)).digest('base64').slice(0, 32);
const iv = crypto.randomBytes(16);

function generateAppointmentToken() {
  return crypto.randomBytes(16).toString('hex');
}

function encryptToken(token) {
  const cipher = crypto.createCipheriv('aes256', key, iv);
  let encryptedToken = cipher.update(token, 'utf8', 'hex');
  encryptedToken += cipher.final('hex');

  return iv.toString('hex') + encryptedToken;
}

function decryptToken(encryptedToken) {
  const decipher = crypto.createDecipheriv('aes256', key, iv);
  let decryptedToken = decipher.update(encryptedToken.slice(32), 'hex', 'utf8');
  decryptedToken += decipher.final('utf8');

  return decryptedToken;
}

module.exports = {
  generateAppointmentToken,
  encryptToken,
  decryptToken,
};
