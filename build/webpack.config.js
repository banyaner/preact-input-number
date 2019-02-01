module.exports = function(env) {
  console.log(env)
  if (env === 'production') {
    return require('./build/webpack.prod.conf.js')
  }
  return require('./build/webpack.dev.conf.js')
}
