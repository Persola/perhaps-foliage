const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('../webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = [
  { // main process
    ...allBuildsConfig,
    entry: './src/core.ts',
    target: 'electron13.1-main',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'built'),
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
    devtool: 'source-map',
  },
  { // renderer process
    ...allBuildsConfig,
    entry: './src/renderer.ts',
    target: 'electron13.1-renderer',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'renderer.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: './node_modules/saliva-repl/dist/index.html',
        scriptSrc: './renderer.js',
      }),
    ],
    devtool: 'source-map',
  },
];