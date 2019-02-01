/**
 * Created by zhongjx on 2018/6/6.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJS = require('uglify-js') // 处理内联函数的压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkg = require('../package.json')
const isDevMode = process.env.NODE_ENV === 'development' // 需在scripts中设置环境变量

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, '../example/src/main.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.[p|s]?css$/,
        use: [
          isDevMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/' // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:7].[ext]',
              outputPath: 'font/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      minify: {
        minifyJS(code) {
          return UglifyJS.minify(code).code
        },
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
    alias: {
      Utils: path.resolve(__dirname, '../src/js/utils')
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          reuseExistingChunk: false,
          priority: -10
        }
      }
    }
  }
}
