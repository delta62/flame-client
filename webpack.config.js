const path           = require('path')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [ ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyEsPlugin())
}
