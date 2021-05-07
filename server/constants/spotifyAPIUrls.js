const getFullUrl = path => `https://api.spotify.com/v1${path}`;

const urls = {
  GET_PROFILE: getFullUrl('/me'),
  GET_CURRENTLY_PLAYING: getFullUrl('/me/player/currently-playing'),
  PUT_PLAY_OR_RESUME: getFullUrl('/me/player/play'),
  PUT_PAUSE: getFullUrl('/me/player/pause'),
  POST_NEXT: getFullUrl('/me/player/next'),
  POST_PREVIOUS: getFullUrl('/me/player/previous'),
};

module.exports = urls;
