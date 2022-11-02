console.log('1')
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        linux: {
          target: ['AppImage'],
          category: 'Network',
        },
        win: {
          target: ['nsis'],
          verifyUpdateCodeSignature: false,
        },
        mac: {
          hardenedRuntime: true,
          entitlements: 'build/entitlements.mac.plist',
          entitlementsInherit: 'build/entitlements.mac.plist',
          gatekeeperAssess: false,
        },
        afterSign: 'scripts/notarize.js',
        publish: [
          {
            provider: 'github',
            releaseType: 'draft',
          },
        ],
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
