module.exports = process.env.CYPRESS_ENV
  ? {}
  : {
      presets: ['@vue/cli-plugin-babel/preset'],
    }
