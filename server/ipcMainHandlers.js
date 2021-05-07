const { ipcMain } = require('electron');
const appService = require('./services/appService');
const spotifyService = require('./services/spotifyService');
const authService = require('./services/authService');

const initPrivate = () => {
  ipcMain.handle('getProfile', spotifyService.getProfile);
  ipcMain.handle('getCurrentlyPlaying', spotifyService.getCurrentlyPlaying);
  ipcMain.handle('playNext', spotifyService.playNext);
  ipcMain.handle('playPrevious', spotifyService.playPrevious);
  ipcMain.handle('playOrResume', spotifyService.playOrResume);
  ipcMain.handle('pause', spotifyService.pause);
  ipcMain.handle('checkAccessToken', appService.checkAccessToken);
}

const initPublic = () => {
  const { createAuthWindow } = require('./processes/authProcess');
  const { closeAppWindow } = require('./processes/appProcess');

  ipcMain.handle('signOut', async () => {
    await authService.logout();
    createAuthWindow();
    closeAppWindow();
  });
}

module.exports = {
  initPrivate,
  initPublic
}
