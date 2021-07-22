const env = require('../helpers/env/env');
const baseUrl = env('SPOTIFY_API_URL')

module.exports = {
  GET_PROFILE: `${baseUrl}/me`,
  GET_CURRENTLY_PLAYING: `${baseUrl}/me/player/currently-playing`,
  PUT_PLAY_OR_RESUME: `${baseUrl}/me/player/play`,
  PUT_PAUSE: `${baseUrl}/me/player/pause`,
  POST_NEXT: `${baseUrl}/me/player/next`,
  POST_PREVIOUS: `${baseUrl}/me/player/previous`,
};
