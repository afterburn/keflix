const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

console.log('running development build')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ifdef-loader', options: { IS_PROD: false } } 
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/reset.css', to: '' },
        { from: 'src/favicon', to: 'favicon'}
      ]
    })
  ]
}