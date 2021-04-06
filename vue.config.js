process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        linux: {
          category: 'Network',
        },
        mac: {
          hardenedRuntime: true,
          entitlements: 'build/entitlements.mac.plist',
          entitlementsInherit: 'build/entitlements.mac.plist',
          gatekeeperAssess: false,
        },
        afterSign: 'scripts/notarize.js',
      },
      nodeIntegration: true,
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
}
