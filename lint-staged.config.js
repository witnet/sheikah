module.exports = {
  '*.js': ['pnpm lint:eslint', 'pnpm lint:prettier'],
  '{!(package)*.json,.!(browserslist)*rc}': [
    'pnpm lint:prettier --parser json',
  ],
  'package.json': ['pnpm lint:prettier'],
  '*.vue': ['pnpm lint:eslint', 'pnpm lint:stylelint', 'pnpm lint:prettier'],
  '*.scss': ['pnpm lint:stylelint', 'pnpm lint:prettier'],
}
