/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
const electron = require('electron');
/* eslint-enable import/no-unresolved, import/no-extraneous-dependencies */

const { app, BrowserWindow } = electron;

app.on('ready', () => {
  new BrowserWindow({
    width: 1000,
    height: 600,
  }).loadURL(`file://${__dirname}/../dist/index.html`);
});
