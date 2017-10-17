import path from 'path';
import webpack from 'webpack';

export default {
  devtools:'eval-source-map',
  entry: [
    path.join(__dirname, 'client/main.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        include: path.join(__dirname, 'client'),
        exclude:/node_modules/,
        loaders: ['babel']
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