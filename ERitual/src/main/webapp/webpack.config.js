const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:'./client/main.js',
  output: {
    path: '/',
    filename:'bundle.js',
    publicPath: '/'
  },
  devServer: {
    inline:true,
    port:3000,
    historyApiFallback: true,
    contentBase: './',
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel',
        query: {
          presets:['es2015','react']
        }
      }
    ]
  },
  resolve: {
    extensions: [ '' , '.js' ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
  
}