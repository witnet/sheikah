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
global.beforeAll(async () => {
  console.log('1. Before Each')
  if (!global.app) {
    const { app, stopServe } = await testWithSpectron(spectron)

    global.app = app
    global.stopServe = stopServe
    global.win = app.browserWindow
    global.client = app.client
  }
})

// stop electron instance after each test
global.afterAll(async () => {
  console.log('2. After Each')
  if (global.app && global.app.isRunning()) {
    await global.stopServe()
    global.app = null
  }
})
