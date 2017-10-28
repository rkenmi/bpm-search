'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev');


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  inline: true,
  hot: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log(config.output.publicPath)
  console.log('Listening at 0.0.0.0:3000')
})
