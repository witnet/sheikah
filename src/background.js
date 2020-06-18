'use strict'
/* global __static */
import fs from 'fs'
import os from 'os'
import path from 'path'
import stream from 'stream'
import util from 'util'
import { spawn } from 'child_process'
import axios from 'axios'
import tar from 'tar'
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib'
import { app, BrowserWindow, Menu, protocol, shell, Tray } from 'electron'
const osArch = os.arch()
const arch = osArch === 'x64' ? 'x86_64' : osArch
const platform = os.platform()

const isDevelopment = process.env.NODE_ENV !== 'production'

const SHEIKAH_PATH = process.env.TRAVIS ? '' : path.join(os.homedir(), '.sheikah')
const VERSION_FILE_NAME = '.version'
const WITNET_FILE_NAME = 'witnet'
const WITNET_CONFIG_FILE_NAME = 'witnet.toml'
const LATEST_RELEASES_URL =
  'https://api.github.com/repos/witnet/witnet-rust/releases/latest'
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
let tray
// open sheikah if is development environment
let status = isDevelopment ? STATUS.READY : STATUS.WAIT
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    icon: path.join(__static, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  })

  if (!isDevelopment) {
    // Hide electron toolbar in production environment
    win.setMenuBarVisibility(false)
  }
  // Disables zooming with pinch
  const webContents = win.webContents
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1)
    webContents.setVisualZoomLevelLimits(1, 1)
    webContents.setLayoutZoomLevelLimits(0, 0)
  })

  loadUrl(status)

  win.on('closed', () => {
    win = null
  })

  win.on('close', function(event) {
    if (win.isFullScreen()) {
      win.once('leave-full-screen', () => win.hide())

      win.setFullScreen(false)
    } else {
      win.hide()
    }
  })

  if (!isDevelopment) {
    // Disable shortcuts defining a hidden menu and binding the shortcut we
    // want to disable to an option
    const menu = Menu.buildFromTemplate([
      {
        label: 'Menu',
        submenu: [
          { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => {} },
          { label: 'ZoomOut', accelerator: 'CmdOrCtrl+-', click: () => {} },
          { label: 'ZoomIn', accelerator: 'CmdOrCtrl+Plus', click: () => {} },
        ],
      },
    ])

    Menu.setApplicationMenu(menu)
  }
}

function createTray() {
  tray = new Tray(path.join(__static, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Sheikah',
      type: 'normal',
      click: function() {
        win.show()
      },
    },
    {
      label: 'Item2',
      type: 'separator',
    },
    {
      label: 'Quit Sheikah',
      type: 'normal',
      click: function() {
        win.destroy()
        app.quit()
      },
    },
  ])

  tray.setToolTip('Sheikah - Witnet wallet and data request editor')
  tray.setContextMenu(contextMenu)
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
  }

  createTray()

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
        asset.browser_download_url.includes(arch) &&
        asset.browser_download_url.includes(platform),
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

      const existWitnetFile = fs.existsSync(
        path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
      )
      const existConfigFile = fs.existsSync(
        path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
      )
      const existVersionFile = fs.existsSync(
        path.join(SHEIKAH_PATH, VERSION_FILE_NAME),
      )
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
        fs.copyFileSync(
          'witnet',
          path.join(SHEIKAH_PATH, WITNET_FILE_NAME),
        )
        fs.copyFileSync(
          'witnet.toml',
          path.join(SHEIKAH_PATH, WITNET_CONFIG_FILE_NAME),
        )
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

  const walletConfigurationPath = path.join(SHEIKAH_PATH, 'witnet.toml')

  const runWallet = spawn(path.join(SHEIKAH_PATH, 'witnet'), [
    '-c',
    walletConfigurationPath,
    'wallet',
    'server',
  ])

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

    // prevent open a new electron window and open the url in os browser
    win.webContents.on('new-window', (e, url) => {
      e.preventDefault()
      shell.openExternal(url)
    })
  }
}

async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}
