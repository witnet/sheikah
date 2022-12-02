const path = require('path')

// module.exports = {
//   root: true,
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//     sourceType: 'script',
//   },

//   plugins: ['import'],

//   extends: [
//     '@vue/prettier',
//     '@vue/prettier/@typescript-eslint',
//     '@vue/typescript',
//     'plugin:import/errors',
//     'plugin:import/typescript',
//     'plugin:import/warnings',
//     'plugin:vue/recommended',
//     'prettier/vue',
//   ],
//   rules: {
//     'no-debugger': 'error',
//     'no-multiple-empty-lines': ['error', { max: 1 }],
//     'import/order': 'error',
//     'vue/array-bracket-spacing': 'error',
//     'vue/arrow-spacing': 'error',
//     'vue/block-spacing': 'error',
//     'vue/brace-style': 'error',
//     'vue/camelcase': 'error',
//     'vue/comma-dangle': ['error', 'always-multiline'],
//     'vue/component-name-in-template-casing': 'error',
//     'vue/dot-location': ['error', 'property'],
//     'vue/eqeqeq': 'error',
//     'vue/key-spacing': 'error',
//     'vue/keyword-spacing': 'error',
//     'vue/no-boolean-default': ['error', 'default-false'],
//     'vue/no-deprecated-scope-attribute': 'error',
//     'vue/no-empty-pattern': 'error',
//     'vue/object-curly-spacing': ['error', 'always'],
//     'vue/padding-line-between-blocks': 'error',
//     'vue/space-infix-ops': 'error',
//     'vue/space-unary-ops': 'error',
//     'vue/v-on-function-call': 'error',
//     'vue/v-slot-style': [
//       'error',
//       {
//         atComponent: 'v-slot',
//         default: 'v-slot',
//         named: 'longform',
//       },
//     ],
//     'vue/valid-v-slot': 'error',
//   },
//   overrides: [
//     {
//       files: ['**/*.spec.js'],
//       parserOptions: {
//         parser: 'babel-eslint',
//         sourceType: 'module',
//       },
//       env: { jest: true },
//       globals: {
//         mount: false,
//         shallowMount: false,
//         shallowMountView: false,
//         createComponentMocks: false,
//         createModuleStore: false,
//         i18n: false,
//       },
//     },
//   ],
//   settings: {
//     'import/resolver': {
//       alias: {
//         map: [['@', path.resolve(__dirname, 'src')]],
//         extensions: ['.vue', '.js', '.ts', '.d.ts'],
//       },
//     },
//     'vue-i18n': {
//       localeDir: path.resolve(__dirname, 'src', 'locales') + '/*.{json}',
//       messageSyntaxVersion: '^9.0.0',
//     },
//   },
// }

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['import'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': [
      'error',
      {
        vue: 'always',
        js: 'ignorePackages',
        scss: 'always',
        svg: 'always',
      },
    ],
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', path.resolve(__dirname, 'src')]],
        extensions: ['.vue', '.js', '.ts', '.d.ts'],
      },
    },
    'vue-i18n': {
      localeDir: path.resolve(__dirname, 'src', 'locales') + '/*.{json}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
}
