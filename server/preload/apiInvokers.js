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
}

module.exports = api;
