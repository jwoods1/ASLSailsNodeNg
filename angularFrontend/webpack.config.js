'use strict'
var webpack = require('webpack'),
WebpackDevServer = require('webpack-dev-server'),
path = require('path');

var PATHS = {
  app: __dirname + '/app'
};

module.exports = {
  context: PATHS.app,
  entry: {
         app: ['webpack/hot/dev-server','./app.js']
  },
  output: {
      path: PATHS.app,
      filename: '/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'style!css!sass'},
      {test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'},
      {test : /\.html/, loader: 'raw'}
    ]
  },
  
  resolve: {
     
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js', '.json'] ,
      modulesDirectories: ['node_modules']
    },
    devServer:{
       proxy:{"/api/*/*": "http://localhost:1337"}
    }
    

};