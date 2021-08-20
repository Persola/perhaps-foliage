import 'electron';
import initializeCoreWorker from 'saliva-repl/dist/initialize-core-worker';

import type {
  CrossContextMessageHandlerRegister,
  CrossContextMessageSender,
} from 'saliva-repl/dist/types/cross-context/cross-context-messaging';

if (typeof window !== 'undefined') {
  throw new Error('This script must be run in the main process, not the renderer');
}

export default (electronFromWrapper: (typeof Electron)): void => {
  const { app, BrowserWindow, ipcMain } = electronFromWrapper;

  app.on('ready', () => {
    const renderer = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: `${__dirname}/renderer-preload.js`,
      },
    });

    const registerCrossContextMessageHandler: CrossContextMessageHandlerRegister = (
      messageType,
      callback,
    ) => {
      ipcMain.on(messageType, (event, arg) => {
        callback(arg);
      });
    };

    const sendCrossContextMessage: CrossContextMessageSender = (type, data) => {
      renderer.webContents.send(type, data);
    };

    initializeCoreWorker(
      registerCrossContextMessageHandler,
      sendCrossContextMessage,
      null,
    );

    renderer.loadURL(`file://${__dirname}/index.html`);
  });
};
