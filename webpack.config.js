const webpack = require('webpack');

const API_URL = {
    production: JSON.stringify('https://isitabanger.herokuapp.com/api'),
    development: JSON.stringify('http://localhost:5000/api')
}

var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'API_URL': API_URL[environment]
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};