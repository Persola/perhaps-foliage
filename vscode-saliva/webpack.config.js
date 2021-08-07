const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

const webpack = require('webpack'); // eslint-disable-line

module.exports = [
  {
    entry: './src/extension.ts',
    target: 'node',
    mode: 'none',
    output: {
      path: path.resolve(__dirname, 'built'),
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        WEB_VERSION: false,
      }),
    ],
    devtool: 'source-map',
    externals: {
      vscode: 'commonjs', // modules added here also need to be added in the .vsceignore file
    },
  },
];
