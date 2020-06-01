module.exports = {
  '*.js': ['yarn lint:eslint', 'yarn lint:prettier'],
  '{!(package)*.json,.!(browserslist)*rc}': [
    'yarn lint:prettier --parser json',
  ],
  'package.json': ['yarn lint:prettier'],
  '*.vue': ['yarn lint:eslint', 'yarn lint:stylelint', 'yarn lint:prettier'],
  '*.scss': ['yarn lint:stylelint', 'yarn lint:prettier'],
}
