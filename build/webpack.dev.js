/**
 * Created by zhongjx on 2018/6/10.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs')
const common = require('./webpack.common.js')
const proxy = require('../package.json').proxy

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    https: false, // 设置为true时也可以配置自己的签名证书
    open: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    progress: true,
    clientLogLevel: 'error',
    disableHostCheck: true,
    host: '0.0.0.0', // 设置通过本机ip访问热加载页面
    // quiet: true,
    historyApiFallback: false, // 需设置成false，否则mock接口未异步，无法被读取到
    proxy
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 热加载时直接返回更新文件名，而不是文件的id
    new webpack.HotModuleReplacementPlugin() // 允许在运行时更新各种模块，而无需进行完全刷新
  ],
  stats: 'minimal'
})
