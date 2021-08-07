const { contextBridge, ipcRenderer } = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires

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
