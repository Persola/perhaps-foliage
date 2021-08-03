const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('./webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = [
  { // main extension process
    ...allBuildsConfig,
    entry: './vscode/src/extension.ts',
    target: 'node',
    mode: 'none',
    output: {
      path: path.resolve(__dirname, 'vscode/built'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        WEB_VERSION: false,
      }),
    ],
    devtool: 'source-map',
    externals: {
      vscode: 'commonjs vscode', // modules added here also need to be added in the .vsceignore file
    },
  },
  { // webview process
    ...allBuildsConfig,
    entry: './vscode/src/webview.ts',
    target: 'electron13.1-renderer', // I don't think VSCode specifies, but presumably it's inside an electron renderer?
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'vscode/built'),
      filename: 'webview.js',
    },
    devtool: 'eval-source-map', //  https://github.com/microsoft/vscode/issues/125802
    externals: {
      vscode: 'acquireVsCodeApi',
    },
  },
];
