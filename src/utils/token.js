const cripto = require('crypto');

function generateToken() {
  return cripto.randomBytes(8).toString('hex');
}

module.exports = generateToken;