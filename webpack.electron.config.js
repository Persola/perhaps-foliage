const webpack = require('webpack'); // eslint-disable-line
const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('./webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = [
  { // main process
    ...allBuildsConfig,
    entry: './electron/src/core.ts',
    target: 'electron13.1-main',
    output: {
      path: path.resolve(__dirname, 'electron/built'),
      filename: 'core.js',
      library: {
        type: 'commonjs2',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        WEB_VERSION: false,
      }),
    ],
  },
  { // renderer process
    ...allBuildsConfig,
    entry: './electron/src/renderer.ts',
    target: 'electron13.1-renderer',
    output: {
      path: path.resolve(__dirname, 'electron/built'),
      filename: 'renderer.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        scriptSrc: './renderer.js',
      }),
    ],
  },
];
