const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProfile: () => ipcRenderer.invoke('getProfile'),
  signOut: () => ipcRenderer.invoke('signOut'),
  getCurrentlyPlaying: () => ipcRenderer.invoke('getCurrentlyPlaying'),
  playOrResume: () => ipcRenderer.invoke('playOrResume'),
  pause: () => ipcRenderer.invoke('pause'),
  playNext: () => ipcRenderer.invoke('playNext'),
  playPrevious: () => ipcRenderer.invoke('playPrevious'),
});
