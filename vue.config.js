// const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CompressionPlugin = require('compression-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const path = require("path");

const target = "http://127.0.0.1:3000";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // assetsDir: 'static'
  //eslint-loader 将 lint 错误输出为编译错误
  publicPath: process.env.NODE_ENV !== "production" ? "/" : "",
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: target,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [],
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("src", resolve("src"))
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },
};
