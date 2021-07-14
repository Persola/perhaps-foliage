const path = require('path');

const sharedConfig = require('./webpack.shared.config.js');

module.exports = {
  ...sharedConfig,
  target: 'browserslist', // targeting electron renderer -> tries to actually run 'require'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron-app.js',
  },
};
