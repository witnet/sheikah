const path = require('path')

module.exports = {
  title: 'Sheikah Style Guide',
  components: [
    'src/components/AddressCardButton.vue',
    'src/components/Balance.vue',
    'src/components/BalanceButtons.vue',
    'src/components/BalanceData.vue',
    'src/components/Fieldset.vue',
    'src/components/LayoutSidebar.vue',
    'src/components/LayoutTransactions.vue',
    'src/components/Tag.vue',
  ],
  require: [
    path.join(__dirname, './src/styles/reset.scss'),
    path.join(__dirname, './src/styles/_colors.scss'),
    path.join(__dirname, './src/styles/fonts.scss'),
    path.join(__dirname, './src/styles/theme.scss'),
    path.join(__dirname, './src/styles/app.global.scss'),
    path.join(__dirname, './styleguide/scripts.js'),
    path.join(__dirname, './styleguide/routerMock.js'),
  ],
  exampleMode: 'expand',
  renderRootJsx: path.join(__dirname, 'styleguide/styleguide.root.js'),
}
