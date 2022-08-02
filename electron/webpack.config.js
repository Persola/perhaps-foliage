const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('../webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = [
  { // main process
    ...allBuildsConfig,
    entry: './src/main.ts',
    target: 'electron13.1-main',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'main.js',
      library: {
        type: 'commonjs2',
      },
    },
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
        template: './node_modules/perhaps-foliage/dist/index.html',
        scriptSrc: './renderer.js',
      }),
    ],
    devtool: 'source-map',
  },
];
