const { contextBridge } = require('electron');
const { api } = require('../processes/rendererProcess');

contextBridge.exposeInMainWorld('api', api);
