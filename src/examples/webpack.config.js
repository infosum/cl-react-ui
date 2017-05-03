var webpack = require('webpack'),
  path = require('path'),
  entry = [
    './app.js'
  ],
  plugins = [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  rules = [{
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader'
      }
    ]
  }, {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      }
    ]
  }];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: entry,
  output: {
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: plugins,
  watchOptions: {
    poll: true
  }
};
