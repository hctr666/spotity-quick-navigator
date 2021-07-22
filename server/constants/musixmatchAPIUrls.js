const env = require('../helpers/env/env');
const baseUrl = env('MUSIXMATCH_API_URL');

module.exports = {
  GET_TRACK: `${baseUrl}/ws/1.1/track.get`
};
