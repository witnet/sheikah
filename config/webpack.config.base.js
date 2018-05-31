/**
 * Base webpack config used across other specific configs
 */
const path = require('path');
const {
  dependencies: externals
} = require(path.join(__dirname, '../package.json'));

module.exports = {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['react-hot-loader/webpack', {
        loader: 'ts-loader',
        options: {
          configFile: path.join(__dirname, 'tsconfig.json')
        }
      }],
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../app')
    },
    modules: [
      path.join(__dirname, '../app'),
      path.join(__dirname, '../node_modules'),
    ]
  },

  plugins: [],

  externals: Object.keys(externals || {})
};
