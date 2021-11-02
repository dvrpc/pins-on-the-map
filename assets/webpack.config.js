const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./assets/index.js", // path to our input file
    "survey-index": "./assets/longform_survey.js",
    "survey-demographics": "./assets/demographic_survey.js",
    "survey-thanks": "./assets/thanks.js",
  },

  output: {
    filename: "[name]-bundle.js", // output bundle file name
    path: path.resolve(__dirname, "../static"), // path to our Django static directory
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
