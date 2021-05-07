const crypto = require('crypto');
const base64url = require('base64url');

const generateCodeChallenge = (codeVerifier) => {
  const base64Digest = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64');

  return base64url.fromBase64(base64Digest);
};

module.exports = generateCodeChallenge;
