const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  mode: 'none',
  entry: './src/initialize-integration.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.lazy\.css/,
        use: [
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
    extensions: ['.ts', '.js'],
  },
  devtool: 'eval-source-map',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: 'pantheon-integration.js',
    library: {
      name: 'initializeIntegration',
      type: 'assign',
    },
  },
};
