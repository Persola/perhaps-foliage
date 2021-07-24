const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const sharedConfig = require('./webpack.shared.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  ...sharedConfig,
  target: 'browserslist', // targeting electron renderer -> tries to actually run 'require'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron-app.js',
  },
};
