const path = require('path')

module.exports = {
  title: 'Sheikah Style Guide',
  components: [
    'src/components/AddressCard.vue',
    'src/components/AddressCardButton.vue',
    'src/components/Addresses.vue',
    'src/components/AddressInformation.vue',
    'src/components/AddressList.vue',
    'src/components/Balance.vue',
    'src/components/BalanceButtons.vue',
    'src/components/BalanceData.vue',
    'src/components/card/TemplateCard.vue',
    'src/components/EditorSettings.vue',
    'src/components/EditorSource.vue',
    'src/components/EditorStageAggregations.vue',
    'src/components/EditorStageBar.vue',
    'src/components/EditorStageScripts.vue',
    'src/components/EditorStageSettings.vue',
    'src/components/EditorStageSources.vue',
    'src/components/EditorStageTally.vue',
    'src/components/EditorToolBar.vue',
    'src/components/Fieldset.vue',
    'src/components/InputsOutputs.vue',
    'src/components/LayoutSidebar.vue',
    'src/components/LayoutTwoColumns.vue',
    'src/components/NetworkStatus.vue',
    'src/components/RadonOperator.vue',
    'src/components/Subscript.vue',
    'src/components/Select.vue',
    'src/components/Tag.vue',
    'src/components/Transaction.vue',
    'src/components/TransactionDetails.vue',
    'src/components/TransactionList.vue',
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
