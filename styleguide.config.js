const path = require('path')

module.exports = {
  title: 'Default Style Guide',
  require: [
    path.join(__dirname, './src/styles/app.global.scss'),
    path.join(__dirname, './src/styles/_colors.scss'),
    path.join(__dirname, './src/styles/fonts.scss'),
    path.join(__dirname, './src/styles/reset.scss'),
    path.join(__dirname, './src/styles/theme.scss'),
  ],
  exampleMode: 'expand',
}
