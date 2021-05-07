const { default: fetch } = require('node-fetch');
const { getAccessToken, getTokenType } = require('../services/authService');

const codes = {
  OK: 200,
  NO_CONTENT: 204
}

const fetchSpotify = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `${getTokenType()} ${getAccessToken()}`,
      ...options.headers
    }
  });

  const { status, statusText } = response;

  if (!(status === codes.OK || status === codes.NO_CONTENT)) {
    throw {
      code: status,
      error: statusText
    };
  }

  return response;
};

module.exports = fetchSpotify;
