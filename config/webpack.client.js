const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const mode = (process.argv[2] === 'prod' || process.argv[2] === 'production')
  ? 'production'
  : 'development'

if (mode === 'production') {
  console.log('running production build')
} else {
  console.log('running development build')
}

module.exports = {
  mode: mode,
  entry: ['@babel/polyfill', path.join(__dirname, '..', 'client', 'src', 'index.js')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '..', 'client', 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ifdef-loader',
            options: {
              IS_PROD: mode === 'production'
            }
          } 
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
      template: path.join(__dirname, '..', 'client', 'src', 'template.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'client/src/reset.css', to: '' },
        { from: 'client/src/favicon', to: 'favicon'}
      ]
    })
  ]
}