module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard', 'prettier', 'prettier/vue'],
  plugins: ['prettier', 'standard', 'vue'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
