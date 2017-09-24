const electron = require ('electron');
const { app, BrowserWindow } = electron;

app.on('ready', () => {
  new BrowserWindow({
    width: 1000,
    height: 600
  }).loadURL(`file://${__dirname}/../dist/index.html`);
});
