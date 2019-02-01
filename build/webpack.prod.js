/**
 * Created by zhongjx on 2018/6/10.
 */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const argv = require('yargs').argv
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const common = require('./webpack.common.js')

const config = {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: 'js/[name].[contenthash].js',
    publicPath: './'
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), // root目录
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成一个四位数的hash作为模块id
    new OptimizeCssAssetsPlugin() // 优化压缩css文件
  ],
  performance: {
    // https://webpack.docschina.org/configuration/performance/#performance
    maxEntrypointSize: 250000,
    maxAssetSize: 500000,
    assetFilter(assetFilename) {
      // 只监测js和png
      return assetFilename.endsWith('.js') || assetFilename.endsWith('.png')
    },
    hints: 'warning'
  },
  optimization: {
    removeEmptyChunks: true // 移除空的chunks
  },
  stats: 'normal'
}
// 是否使用bundle分析
argv.analyze && config.plugins.push(new BundleAnalyzerPlugin())

module.exports = merge(common, config)
