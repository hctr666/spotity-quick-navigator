const keytar = require('keytar');
const os = require('os');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const generateCodeChallenge = require('../helpers/generateCodeChallenge');
const generateRandomString = require('../helpers/generateRandomString');
const env = require('../helpers/env/env');
const getConfig = require('../helpers/config/getConfig');

const clientId = getConfig('spotify.clientId')
const port = env('PORT');

const tokenAPIUrl = 'https://accounts.spotify.com/api/token';

const redirectURI = `http://localhost:${port}/callback`;

const keytarService = 'spotify-auth-service';
const keytarAccount = os.userInfo().username;

let accessToken = null,
      tokenType = null,
   refreshToken = null;

const codeVerifier = generateRandomString(50, { useSpecialChars: true });
const params = new URLSearchParams({
  client_id: clientId,
  response_type: 'code',
  redirect_uri: redirectURI,
  code_challenge_method: 'S256',
  code_challenge: generateCodeChallenge(codeVerifier),
  state: generateRandomString(16),
  scope: 'user-read-private user-read-email user-read-currently-playing user-modify-playback-state'
})

const getAccessToken = () => accessToken;

const getTokenType = () => tokenType;

const getAuthorizationURL = () => {
  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

const refreshTokens = async () => {
  const refreshToken = await keytar.getPassword(keytarService, keytarAccount);
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId
  });

  if (refreshToken) {
    const refreshOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    };

    try {
      const response = await fetch(tokenAPIUrl, refreshOptions);
      const data = await response.json();
      accessToken = data.access_token;
      tokenType = data.token_type;

      console.log('Refresh token requested: ', accessToken);

    } catch (error) {
      await logout();

      throw error;
    }
  } else {
    throw new Error('No available refresh token.');
  }
};

const loadTokens = async (callbackURL) => {
  const urlQuery = new URLSearchParams(new URL(callbackURL).search);
  const exchangeOptions = {
    grant_type: 'authorization_code',
    client_id: clientId,
    code: urlQuery.get('code'),
    redirect_uri: redirectURI,
    code_verifier: codeVerifier
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: (new URLSearchParams(exchangeOptions)).toString(),
  };

  try {
    const response = await fetch(tokenAPIUrl, options);
    const data = await response.json();

    accessToken = data.access_token;
    refreshToken = data.refresh_token;
    tokenType = data.token_type;

    console.log('Access token requested: ', accessToken);

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken);
    }
  } catch (error) {
    await logout();

    throw error;
  }
}

const logout = async () => {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
  refreshToken = null;
}

module.exports = {
  getAccessToken,
  getTokenType,
  getAuthorizationURL,
  loadTokens,
  logout,
  refreshTokens
};
