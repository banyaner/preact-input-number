const postcss = require('postcss')
module.exports = {
  // parser: 'sugarss',
  parser: 'postcss-scss',
  sourceMap: true,
  plugins: {
    'postcss-preset-env': {}, // 包含了autoprefixer
    'postcss-plugin-px2rem': {
      propBlackList: ['border-width']
    }
  }
}
