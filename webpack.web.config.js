const webpack = require('webpack'); // eslint-disable-line
const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('./webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  ...allBuildsConfig,
  entry: {
    core: './web/src/core.ts',
    renderer: './web/src/renderer.ts',
  },
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, 'web/built'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      WEB_VERSION: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      scriptSrc: './renderer.js',
    }),
  ],
};
