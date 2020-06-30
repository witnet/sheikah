import spectron from 'spectron'
import { testWithSpectron } from 'vue-cli-plugin-electron-builder'

// Global helpers
global.spectron = spectron
global.testWithSpectron = testWithSpectron

global.app = null
global.stopServe = null
global.win = null
global.client = null

jest.setTimeout(200000)

// start electron before each test
global.beforeEach(async () => {
  if (!global.app) {
    const { app, stopServe } = await testWithSpectron(spectron)

    global.app = app
    global.stopServe = stopServe
    global.win = app.browserWindow
    global.client = app.client
  }
})

// stop electron instance after each test
global.afterEach(async () => {
  if (global.app && global.app.isRunning()) {
    await global.stopServe()
    global.app = null
  }
})
