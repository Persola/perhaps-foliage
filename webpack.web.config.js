const path = require('path');

const sharedConfig = require('./webpack.shared.config.js');

module.exports = {
  ...sharedConfig,
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'web-app.js',
  },
};
