"use strict";
var webpack = require("webpack");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "jsx-loader?harmony", exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};