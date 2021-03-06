const path = require('path');
const { app, BrowserWindow } = require('electron');
const ipcMainHandlers = require('../ipcMainHandlers');

const { PORT } = process.env;
const isDev = !app.isPackaged;

let mainWindow = null;

function createAppWindow() {
  mainWindow = new BrowserWindow({
    width: 573,
    height: 120,
    show: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      devTools: isDev,
      enableRemoteModule: false,
      preload: path.join(__dirname, '../preload/preload.js')
    }
  });

  const startURL = isDev ? `http://localhost:${PORT}` : `file://${path.join(__dirname, '../ui/build/index.html')}`;

  mainWindow.loadURL(startURL);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function closeAppWindow() {
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }
}

// Initialize private ipcMain handlers
ipcMainHandlers.initPrivate();

module.exports = {
  createAppWindow,
  closeAppWindow
};
