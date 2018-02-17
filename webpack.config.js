// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry : './react/index.jsx',
  output : {
      filename : 'bundle.js',
      path : path.resolve(__dirname, 'public/javascripts')
  },
  module : {
      loaders : [{
          test : /\.js$/,
          loader : 'babel-loader',
          exclude : /node_modules/
      }, {
          test : /\.jsx$/,
          loader : 'babel-loader',
          exclude : /node_modules/
      }]
  },
  // Minimizing
  plugins : [
      /*new webpack.optimize.UglifyJsPlugin({
       compress : {
       warnings : false
       },
       output : {
       comments : false
       }
       })*/
  ]
};