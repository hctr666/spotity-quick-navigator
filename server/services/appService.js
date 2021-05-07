const { getAccessToken } = require('./authService');

const checkAccessToken = () => {
  const accessToken = getAccessToken();
  return accessToken !== null && typeof accessToken !== 'undefined'
};

module.exports = { checkAccessToken };
