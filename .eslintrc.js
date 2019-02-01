module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    browser: true
  },
  rules: {
    'prettier/prettier': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
