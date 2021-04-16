require('./initEnv');
const { app, ipcMain } = require('electron');
const { createAuthWindow } = require('./authProcess');
const { createAppWindow, closeAppWindow } = require('./appProcess');
const authService = require('./authService');

async function showWindow() {
  try {
    //await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.handle('signOut', async () => {
  await authService.logout();
  createAuthWindow();
  closeAppWindow();
});
