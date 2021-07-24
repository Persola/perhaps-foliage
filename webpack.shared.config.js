const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // eslint-disable-line

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  mode: 'none',
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' },
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
    HtmlWebpackPluginConfig,
    new NodePolyfillPlugin(),
  ],
  devtool: 'source-map',
};
