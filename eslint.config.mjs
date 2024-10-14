import path from 'path'

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import eslintPluginImport from 'eslint-plugin-import'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,cjs,mjs,ts,mts,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/.witnet-rust-testnet-*-wallet',
      '**/auto-imports.d.ts',
      '**/build/**',
      '**/coverage/**',
      '**/dist-electron/',
      '**/dist-ssr/**',
      '**/dist/**',
      '**/src/components.d.ts',
      '**/src/locales/**',
      '/dist_electron/',
    ],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      // Override import/extensions rule
      'import/extensions': [
        'error',
        {
          vue: 'always',
          js: 'ignorePackages',
          scss: 'always',
          svg: 'always',
        },
      ],
      // Disable specific Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/block-lang': 'off',
      // TODO: remove this rule
      '@typescript-eslint/no-explicit-any': 'off',
      'import/extensions': 'off',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', path.resolve('src')]],
          extensions: ['.vue', '.js', '.ts', '.d.ts'],
        },
      },
      'vue-i18n': {
        localeDir: path.resolve('src', 'locales') + '/*.{json}',
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
