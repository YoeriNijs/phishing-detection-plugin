import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { merge } from 'webpack-merge';

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

const rulesConf = merge(common, {
  entry: './src/rules/default.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', '..', 'release-rules'),
    filename: 'all_rules.js',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
  devtool: false
});

export default [rulesConf];
