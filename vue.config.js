process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        linux: {
          category: 'Network',
        },
      },
      nodeIntegration: true,
    },
  },
}
