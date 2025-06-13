const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const settingsConf = merge(common, {
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

const reportConf = (module.exports = merge(common, {
  entry: './src/browsers/chrome/report.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'report.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/browsers/chrome/report.html', to: '.' }]
    })
  ]
}));

const unblockConf = (module.exports = merge(common, {
  entry: './src/browsers/chrome/unblock.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'unblock.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/browsers/chrome/unblock.html', to: '.' }]
    })
  ]
}));

const pluginConf = merge(common, {
  entry: './src/browsers/chrome/plugin.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
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
        { from: 'src/browsers/chrome/blocked.html', to: '.' }
      ]
    })
  ]
});

module.exports = [settingsConf, reportConf, unblockConf, pluginConf];
