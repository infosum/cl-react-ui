var webpack = require('webpack'),
  path = require('path'),
  entry = [
    './app.js'
  ],
  plugins = [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  rules = [
    {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel-loader'}
  ];

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
  plugins: plugins,
  watchOptions: {
    poll: true
  }
};
