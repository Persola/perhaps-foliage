const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const commonConfig = {
  mode: 'none',
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
  target: 'browserslist',
};

module.exports = [
  { // hot loadable integration
    ...commonConfig,
    entry: './src/initialize-integration.ts',
    devtool: 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'saliva-hotloadable-integration.js',
      library: {
        name: 'initializeIntegration',
        type: 'assign',
      },
    },
  },
  { // builtin integration: for core context
    ...commonConfig,
    entry: './src/core-integration.ts',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'saliva-core-integration.js',
      library: {
        type: 'commonjs2',
      },
    },
  },
  { // builtin integration: for renderer context
    ...commonConfig,
    entry: './src/renderer-integration.ts',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'saliva-renderer-integration.js',
      library: {
        type: 'commonjs2',
      },
    },
  },
];
