import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const common = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

const pluginConf = merge(common, {
  entry: './src/browsers/chrome/chrome-plugin.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'plugin.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
});

const storageConf = merge(common, {
  entry: './src/browsers/chrome/chrome-storage.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'storage.js'
  },
  devtool: false,
  optimization: {
    minimize: false
  },
  plugins: []
});

const settingsConf = merge(common, {
  entry: './src/browsers/_shared/settings.ts',
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
      patterns: [{ from: './src/browsers/_shared/settings.html', to: '.' }]
    })
  ]
});

const i18nConf = merge(common, {
  entry: './src/browsers/_shared/i18n/i18n.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build', 'chrome'),
    filename: 'i18n.js'
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
});

const reportConf = merge(common, {
  entry: './src/browsers/_shared/report.ts',
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
      patterns: [
        {
          from: './src/browsers/chrome/chrome-report.html',
          to: './report.html'
        }
      ]
    })
  ]
});

const unblockConf = merge(common, {
  entry: './src/browsers/_shared/unblock.ts',
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
      patterns: [
        { from: 'src/browsers/_shared/manifest.json', to: '.' },
        { from: 'src/browsers/_shared/icons/shield.png', to: '.' },
        { from: 'src/browsers/_shared/blocked.html', to: '.' },
        {
          from: './src/browsers/_shared/unblock.html',
          to: './unblock.html'
        }
      ]
    })
  ]
});

export default [
  pluginConf,
  i18nConf,
  storageConf,
  settingsConf,
  reportConf,
  unblockConf
];
