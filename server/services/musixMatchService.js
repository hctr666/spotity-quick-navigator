const fetch = require('node-fetch').default;
const getConfig = require('../helpers/config/getConfig');
const urls = require('../constants/musixmatchAPIUrls');
const apiKey = getConfig('musixmatch.apiKey');

const getTrackSubtitles = (track_isrc) => {
  console.log({track_isrc});
  fetch(`${urls.GET_TRACK}?apiKey=${apiKey}&format=jsonp&track_isrc=${track_isrc}`, {

  })
    .then(response => {
      console.log({response});
      return response.body
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

module.exports = {
  getTrackSubtitles
}
