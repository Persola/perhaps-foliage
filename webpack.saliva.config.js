const path = require('path');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  mode: 'none',
  entry: './src/extension-staging-area/saliva/initialize-integration.ts',
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /editor-styles\.css/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.lazy\.css/,
        use: [
          { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.ya?ml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
  devtool: 'source-map',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, 'src/extension-staging-area/saliva/dist'),
    filename: 'saliva-integration.js',
    library: {
      name: 'initializeIntegration',
      type: 'assign',
    },
  },
};
