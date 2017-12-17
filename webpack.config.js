const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/app.js',
  output: {
    path: (__dirname + '/dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /(\.js|\.jsx)$/, exclude: /node_modules/, use: [
        { loader: 'babel-loader' }
      ]},
      { test: /\.sass$/, use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {loader: "sass-loader"}
      ]},
      { test: /\.ya?ml$/, use: [
        { loader: 'json-loader' },
        { loader: 'yaml-loader' }
      ]}
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  resolve: {
    alias: {
      // this worked, but flow didn't know about it so it would fail to find files
      // tried to use flow's module.name_mapper.extension option but it had no apparent effect
      // so using relative paths for now
      projectRoot: __dirname + '/src'
    }
  },
  devtool: 'source-map'
}
