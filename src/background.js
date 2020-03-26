'use strict'
/* global __static */
import fs from 'fs'
import os from 'os'
import tar from 'tar'
import axios from 'axios'
import path from 'path'
import stream from 'stream'
import util from 'util'
import { spawn } from 'child_process'
import { BrowserWindow, app, protocol, globalShortcut } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
import { sleep } from '@/utils'
const osArch = os.arch()
const arch = osArch === 'x64' ? 'x86_64' : osArch
const platform = os.platform()

const isDevelopment = process.env.NODE_ENV !== 'production'

const SHEIKAH_PATH = path.join(os.homedir(), '.sheikah')
const VERSION_FILE_NAME = '.version'
const WITNET_FILE_NAME = 'witnet'
const WITNET_CONFIG_FILE_NAME = 'witnet.toml'
const LATEST_RELEASES_URL = 'https://api.github.com/repos/witnet/witnet-rust/releases/latest'
const STATUS = {
  OS_NOT_SUPPORTED: 'OS_NOT_SUPPORTED',
  WAIT: 'WAIT',
  READY: 'READY',
}
const STATUS_PATH = {
  [STATUS.OS_NOT_SUPPORTED]: 'wallet-not-found',
  [STATUS.WAIT]: 'setup',
  [STATUS.READY]: '',
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// open sheikah if is development environment
let status = isDevelopment ? STATUS.READY : STATUS.WAIT
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__static, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (!isDevelopment) {
    // Hide electron toolbar in production environment
    win.setMenuBarVisibility(false)
  }

  loadUrl(status)

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  } else {
    globalShortcut.register('CmdOrCtrl+R', () => {})
    globalShortcut.register('CmdOrCtrl+Shift+R', () => {})
  }

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

if (!isDevelopment) {
  main()
}

function main() {
  axios.get(LATEST_RELEASES_URL).then(async result => {
    const release = result.data.assets.find(
      asset =>
        asset.browser_download_url.includes(arch) && asset.browser_download_url.includes(platform)
    )
    if (release) {
      const releaseUrl = release.browser_download_url
      const latestReleaseVersion = releaseUrl
        .match(/[/](\d+[.]){2}(\d+)[/]/)[0]
        .replace('/', '')
        .replace('/', '')
      console.log('Latest release version: ' + latestReleaseVersion)

      if (!fs.existsSync(SHEIKAH_PATH)) {
        fs.mkdirSync(SHEIKAH_PATH)
      }

      const existWitnetFile = fs.existsSync(path.join(SHEIKAH_PATH, WITNET_FILE_NAME))
      const existConfigFile = fs.existsSync(path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME))
      const existVersionFile = fs.existsSync(path.join(SHEIKAH_PATH, VERSION_FILE_NAME))
      const isLastestVersion =
        existConfigFile &&
        existWitnetFile &&
        existVersionFile &&
        latestReleaseVersion ===
          fs.readFileSync(path.join(SHEIKAH_PATH, VERSION_FILE_NAME)).toString()

      if (!isLastestVersion) {
        await downloadWalletRelease(releaseUrl, latestReleaseVersion)
      }
      runWallet()
    } else {
      status = STATUS.OS_NOT_SUPPORTED
      loadUrl(status)

      console.log('Your OS is not supported yet')
    }
  })
}

async function downloadWalletRelease(releaseUrl, version) {
  status = STATUS.WAIT
  loadUrl(STATUS.WAIT)
  await sleep(5000)
  return new Promise((resolve, reject) => {
    axios
      .get(releaseUrl, { responseType: 'stream' })
      .then(async response => {
        const file = `witnet-release-${arch}-${platform}.tar.gz`
        const pipeline = util.promisify(stream.pipeline)
        // Promise equivalent for response.data.pipe(writeStream)
        await pipeline(response.data, fs.createWriteStream(file))
        console.log('witnet release downloaded succesfully')
        console.log('Decompressing release...')
        // Decompress tar.gz file
        tar.x({
          file,
          sync: true,
        })
        // TODO: tar is not decompressing correctly if a path is given.
        // Create these files in ./sheikah
        fs.copyFileSync('witnet', path.join(`${SHEIKAH_PATH}`, WITNET_FILE_NAME))
        fs.copyFileSync('witnet.toml', path.join(`${SHEIKAH_PATH}`, WITNET_CONFIG_FILE_NAME))
        fs.writeFileSync(path.join(SHEIKAH_PATH, VERSION_FILE_NAME), version)

        // Remove the compressed file
        fs.unlinkSync(file)
        resolve()
      })
      .catch(err => {
        console.log('err', err)
      })
  })
}

// Run Witnet wallet and load "ready" url
async function runWallet() {
  console.log('Running wallet...')
  const runWallet = spawn(`${SHEIKAH_PATH}/witnet`, ['wallet', 'server'])

  runWallet.stdout.on('data', function(data) {
    console.log('stdout: ' + data.toString())
    status = STATUS.READY
    loadUrl(status)
  })

  runWallet.stderr.on('data', function(data) {
    console.log('stderr: ' + data.toString())
  })
}

// load a url if browser window is ready according to the current status
function loadUrl(s) {
  if (win) {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/${STATUS_PATH[s]}`)
      // win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}`)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL(`app://./index.html/#/${STATUS_PATH[s]}`)
    }
  }
}
