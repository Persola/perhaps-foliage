const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'bridged',
  {
    sendCrossContextMessage: (type, data) => {
      ipcRenderer.send(type, data);
    },
    onCrossContextMessage: (type, callback) => {
      ipcRenderer.on(type, callback);
    },
  },
);
