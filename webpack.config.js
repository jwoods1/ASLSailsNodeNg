'use strict'
var webpack = require('webpack'),
path = require('path');

var PATHS = {
  app: __dirname + '/assets'
};

module.exports = {
  context: PATHS.app,
  entry: {
         app: ['./app.js']
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
      {test : /\.html/, loader: 'raw'},
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
   node: {
    console: true,
    fs: 'empty',
    net: "empty",
    tls: "empty"
  },
  resolve: {
     
      // you can now require('file') instead of require('file.coffee')
      extensions: ['', '.js', '.json'] ,
      modulesDirectories: ['node_modules'],
      root:[path.join(__dirname, "bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ],
    
    

};