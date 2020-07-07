import spectron from 'spectron'
import { testWithSpectron } from 'vue-cli-plugin-electron-builder'

// Global helpers
global.spectron = spectron
global.testWithSpectron = testWithSpectron

global.app = null
global.stopServe = null
global.win = null
global.client = null

jest.setTimeout(100000)

global.beforeEach(async () => {
  console.log('beforeEach')
  await sleep(5000)
})
global.afterEach(() => {
  console.log('afterEach')
})
// start electron before each test
global.beforeAll(async () => {
  console.log('1. Before All')
  if (!global.app) {
    const { app, stopServe } = await testWithSpectron(spectron, {
      forceDev: true,
    })

    global.app = app
    global.stopServe = stopServe
    global.win = app.browserWindow
    global.client = app.client
  }
})

// stop electron instance after each test
global.afterAll(async () => {
  console.log('2. After All')
  if (global.app && global.app.isRunning()) {
    await global.stopServe()
    global.app = null
  }
})
global.sleep = sleep

async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}
