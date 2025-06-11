const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  entry: './src/browsers/firefox/settings.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build', 'firefox'),
    filename: 'settings.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: []
});
