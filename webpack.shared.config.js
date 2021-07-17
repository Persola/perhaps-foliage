const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  mode: 'none',
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
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
  plugins: [
    HtmlWebpackPluginConfig,
    new NodePolyfillPlugin(),
  ],
  resolve: {
    alias: {
      // this worked, but flow didn't know about it so it would fail to find files
      // tried to use flow's module.name_mapper.extension option but it had no apparent effect
      // so using relative paths for now
      projectRoot: `${__dirname}/src`,
    },
  },
  devtool: 'source-map',
};
