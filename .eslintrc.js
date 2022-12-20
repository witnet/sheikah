const path = require('path')

// module.exports = {

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
    "plugin:vue/vue3-recommended",
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
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
  parserOptions: {
    ecmaVersion: 'latest',
    // parser: '@typescript-eslint/parser',
    // sourceType: 'script',
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
    overrides: [
      {
        files: ['**/*.spec.js'],
        // parserOptions: {
        //   parser: 'babel-eslint',
        //   sourceType: 'module',
        // },
        env: { jest: true },
        globals: {
          mount: false,
          shallowMount: false,
          shallowMountView: false,
          createComponentMocks: false,
          createModuleStore: false,
          i18n: false,
        },
      },
    ],
}
