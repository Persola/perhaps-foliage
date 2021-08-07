module.exports = {
  module: {
    rules: [
      {
        test: /(\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /editor-styles\.css/,
        use: [
          { loader: 'style-loader' },
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
};
