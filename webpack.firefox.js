const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  entry: "./src/browsers/firefox/plugin.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build", "firefox"),
    filename: "firefox.js",
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CopyPlugin({
      // Listed explicit intentionally
      patterns: [
        { from: "src/browsers/firefox/manifest.json", to: "." },
        { from: "src/browsers/firefox/settings.html", to: "." },
        { from: "src/browsers/firefox/blocked.html", to: "." },
        { from: "src/browsers/firefox/icons/shield.png", to: "." },
        { from: "src/browsers/firefox/icons/blocked.png", to: "." },
      ],
    }),
  ],
});
