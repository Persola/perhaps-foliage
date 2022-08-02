const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

const allBuildsConfig = require('../webpack.all-builds.config.js'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  ...allBuildsConfig,
  entry: {
    main: './src/main.ts',
    renderer: './src/renderer.ts',
  },
  target: 'browserslist',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'built'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './node_modules/perhaps-foliage/dist/index.html',
      scriptSrc: './renderer.js',
    }),
  ],
  devtool: 'source-map',
};
