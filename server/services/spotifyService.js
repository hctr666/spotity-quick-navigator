const urls = require('../constants/spotifyAPIUrls');
const fetchSpotify = require('../helpers/fetchSpotify');

const getProfile = async () => {
  try {
    const response = await fetchSpotify(urls.GET_PROFILE);
    const result   = await response.json();
    return result;
  } catch(error) {
    return error;
  }
};

const getCurrentlyPlaying = async () => {
  try {

    const result = await fetchSpotify(`${urls.GET_CURRENTLY_PLAYING}?market=ES`, {
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json'
      }
    });

    const data = await result.json();
    const {
      is_playing: isPlaying,
      item: { id, name, album, artists, external_ids: { isrc } }
    } = data;

    return { isPlaying, id, name, album, artists, isrc };
  } catch(error) {
    return error;
  }
};

const playOrResume = async () => (
  fetchSpotify(urls.PUT_PLAY_OR_RESUME, { method: 'PUT' })
);

const pause = async () => (
  fetchSpotify(urls.PUT_PAUSE, { method: 'PUT' })
);

const playNext = async () => (
  fetchSpotify(urls.POST_NEXT, { method: 'POST' })
);

const playPrevious = async () => (
  fetchSpotify(urls.POST_PREVIOUS, { method: 'POST' })
);

module.exports = {
  getProfile,
  getCurrentlyPlaying,
  playOrResume,
  pause,
  playNext,
  playPrevious
}
