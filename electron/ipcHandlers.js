const { default: fetch } = require('node-fetch');
const { ipcMain } = require('electron');
const { getAccessToken, getTokenType } = require('./authService');

const apiUrls = {
  GET_PROFILE: 'https://api.spotify.com/v1/me',
  GET_CURRENTLY_PLAYING: 'https://api.spotify.com/v1/me/player/currently-playing',
  PUT_PLAY_OR_RESUME: 'https://api.spotify.com/v1/me/player/play',
  PUT_PAUSE: 'https://api.spotify.com/v1/me/player/pause',
  POST_NEXT: 'https://api.spotify.com/v1/me/player/next',
  POST_PREVIOUS: 'https://api.spotify.com/v1/me/player/previous',
}

const getSharedHeaders = () => ({
  Authorization: `${getTokenType()} ${getAccessToken()}`
});

ipcMain.handle('getProfile', async () => {
  console.log('Authorization: ', `${getTokenType()} ${getAccessToken()}`);
  const result = await fetch(apiUrls.GET_PROFILE, {
    headers: getSharedHeaders()
  });
  return await result.json();
});

ipcMain.handle('getCurrentlyPlaying', async () => {
  const result = await fetch(`${apiUrls.GET_CURRENTLY_PLAYING}?market=ES`, {
    headers: {
      ...getSharedHeaders(),
      Accept: 'application/json',
      ContentType: 'application/json'
    }
  });

  try {
    const {
      is_playing: isPlaying,
      item: {
        id,
        name,
        album,
        artists
      }
    } = await result.json();

    return { isPlaying, id, name, album, artists };
  } catch(error) {
    console.log({error});
  }
});

ipcMain.handle('playNext', async () => {
  return await fetch(apiUrls.POST_NEXT, {
    method: 'POST',
    headers: getSharedHeaders()
  });
});

ipcMain.handle('playPrevious', async () => {
  return await fetch(apiUrls.POST_PREVIOUS, {
    method: 'POST',
    headers: getSharedHeaders()
  });
});

ipcMain.handle('playOrResume', async () => {
  return await fetch(apiUrls.PUT_PLAY_OR_RESUME, {
    method: 'PUT',
    headers: getSharedHeaders()
  });
});

ipcMain.handle('pause', async () => {
  return await fetch(apiUrls.PUT_PAUSE, {
    method: 'PUT',
    headers: getSharedHeaders()
  });
});
