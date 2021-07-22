const env = require('../helpers/env/env');

module.exports = {
  clientId: env('SPOTIFY_CLIENT_ID'),
  clientSecret: env('SPOTIFY_CLIENT_SECRET')
};
