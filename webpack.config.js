const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, use: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin({dangerouslyAllowCleanPatternsOutsideProject: true}),
    new HtmlWebpackPlugin({
       template: './src/index.html',
       filename: '../index.html'
    }),
  ],
  output: {
    path: __dirname + '/build/js',
    publicPath: '/js/',
    filename: 'bundle.[contenthash].js'
  }
};
