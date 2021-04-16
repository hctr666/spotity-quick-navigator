const { BrowserWindow } = require('electron');
const { URLSearchParams } = require('url');
const authService = require('./authService');
const { createAppWindow } = require('./appProcess');

let win = null;

function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  win.loadURL(authService.getAuthorizationURL());

  const { session: { webRequest } } = win.webContents;

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

  win.on('authenticated', () => {
    destroyAuthWin();
  });

  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
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
