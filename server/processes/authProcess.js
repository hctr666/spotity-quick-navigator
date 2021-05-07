const { BrowserWindow } = require('electron');
const authService = require('../services/authService');
const { createAppWindow } = require('../processes/appProcess');

let authWindow = null;

function createAuthWindow() {
  destroyAuthWin();

  authWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  authWindow.loadURL(authService.getAuthorizationURL());

  const { session: { webRequest } } = authWindow.webContents;

  const filter = {
    urls: [
      'http://localhost:3003/callback*'
    ]
  };

  const hasAccessDenied = (url) => {
    const error = (new URL(url)).searchParams.get('error');
    return error === 'access_denied';
  }

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    if (!hasAccessDenied(url)) {
      await authService.loadTokens(url);
      createAppWindow();
      return destroyAuthWin();
    }
  });

  authWindow.on('authenticated', () => {
    destroyAuthWin();
  });

  authWindow.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!authWindow) return;
  authWindow.close();
  authWindow = null;
}

function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  logoutWindow.on('ready-to-show', async () => {
    logoutWindow.close();
    await authService.logout();
  });
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};
