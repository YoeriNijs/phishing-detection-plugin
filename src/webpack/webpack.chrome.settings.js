const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  entry: './src/browsers/chrome/settings.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'settings.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/browsers/chrome/settings.html', to: '.' }]
    })
  ]
});
