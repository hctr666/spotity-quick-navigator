const { contextBridge } = require('electron');
const apiInvokers = require('./apiInvokers');

contextBridge.exposeInMainWorld('api', apiInvokers);
