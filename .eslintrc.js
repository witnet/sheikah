module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
    }],
    'max-line-length': [true, 120],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
