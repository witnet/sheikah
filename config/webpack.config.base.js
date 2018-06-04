/**
 * Base webpack config used across other specific configs
 */

const {join, resolve} = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'ts-loader',
            options: { configFile: join(__dirname, 'tsconfig.json') }
          }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  output: {
    path: join(__dirname, '../dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      app: resolve(__dirname, '../app')
    },
    modules: [
      join(__dirname, '../app'),
      join(__dirname, '../node_modules'),
    ]
  }
};
