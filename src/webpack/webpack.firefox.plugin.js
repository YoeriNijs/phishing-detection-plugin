const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pluginConf = merge(common, {
  entry: './src/browsers/firefox/plugin.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'firefox'),
    filename: 'plugin.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CopyPlugin({
      // Listed explicit intentionally
      patterns: [
        { from: 'src/browsers/_shared/manifest.json', to: '.' },
        { from: 'src/browsers/_shared/icons/shield.png', to: '.' },
        { from: 'src/browsers/_shared/icons/blocked.png', to: '.' },
        { from: 'src/browsers/firefox/settings.html', to: '.' },
        { from: 'src/browsers/firefox/blocked.html', to: '.' }
      ]
    })
  ]
});

const settingsConf = merge(common, {
  entry: './src/browsers/firefox/settings.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'firefox'),
    filename: 'settings.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: []
});

module.exports = [settingsConf, pluginConf];
