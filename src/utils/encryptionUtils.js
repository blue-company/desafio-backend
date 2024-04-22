const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

function generateEncryptedId() {
  const uuid = uuidv4();
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    Buffer.from(process.env.ENCRYPTION_IV, 'hex'),
  );
  let encrypted = cipher.update(uuid, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

module.exports = {
  generateEncryptedId,
};
