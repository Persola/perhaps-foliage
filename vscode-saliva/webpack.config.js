const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const webpack = require('webpack'); // eslint-disable-line

const allBuildsConfig = require('../webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = [
  { // main extension process
    ...allBuildsConfig,
    entry: './src/extension.ts',
    target: 'node',
    mode: 'none',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
    },
    devtool: 'source-map',
    externals: {
      vscode: 'commonjs vscode', // modules added here also need to be added in the .vsceignore file
    },
  },
  { // webview
    ...allBuildsConfig,
    entry: './src/webview-with-renderers.ts',
    target: 'electron13.1-renderer',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'webview-with-renderers.js',
    },
    devtool: 'source-map', // required by VSCode
    externals: {
      vscode: 'commonjs vscode', // modules added here also need to be added in the .vsceignore file
    },
  },
];
