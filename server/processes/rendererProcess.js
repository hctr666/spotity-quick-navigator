const { ipcRenderer } = require('electron');

const api = {
  checkAccessToken: () => ipcRenderer.invoke('checkAccessToken'),
  getProfile: () => ipcRenderer.invoke('getProfile'),
  signOut: () => ipcRenderer.invoke('signOut'),
  getCurrentlyPlaying: () => ipcRenderer.invoke('getCurrentlyPlaying'),
  playOrResume: () => ipcRenderer.invoke('playOrResume'),
  pause: () => ipcRenderer.invoke('pause'),
  playNext: () => ipcRenderer.invoke('playNext'),
  playPrevious: () => ipcRenderer.invoke('playPrevious'),
  getTrackLyrics: async (track_isrc) => await ipcRenderer.invoke('getTrackLyrics', track_isrc)
}

module.exports = { api };
