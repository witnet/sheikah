'use strict'
/* global __static */
import os from 'os'
import path from 'path'
import stream from 'stream'
import util from 'util'
import cp from 'child_process'
import axios from 'axios'
// import tar from 'tar'
import fs from 'fs-extra'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import {
  app,
  BrowserWindow,
  Menu,
  protocol,
  shell,
  Tray,
  ipcMain,
} from 'electron'
import progress from 'progress-stream'
const osArch = os.arch()
const arch = osArch === 'x64' ? 'x86_64' : osArch
const platform = os.platform()
const isDevelopment = process.env.NODE_ENV !== 'production'
const SHEIKAH_PATH_BY_PLATFORM = {
  darwin: path.join(os.homedir(), 'Desktop', '.sheikah'),
  linux: path.join(os.homedir(), '.sheikah'),
}
const SHEIKAH_PATH = process.env.TRAVIS
  ? ''
  : SHEIKAH_PATH_BY_PLATFORM[platform]
const FILE_NAME = {
  darwin: `witnet-0.9.3-${arch}-apple-${platform}.tar.gz`,
  linux: `release-${arch}-${platform}.tar.gz`,
}
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
let walletProcess
let createdProtocol

// open sheikah if is development environment
let status = isDevelopment ? STATUS.READY : STATUS.WAIT
let forceQuit = false

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  win.show()
  if (win === null) {
    createWindow()
  }
})

app.on('before-quit', function() {
  if (process.platform === 'darwin') {
    // flag to close sheikah from darwin's dock and prevent default darwin's close behavior
    forceQuit = true
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createTray()

  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Ipc event received from the client to close sheikah
ipcMain.on('shutdown-finished', () => {
  if (win) win.destroy()
  app.quit()
})

ipcMain.on('app_version', event => {
  event.sender.send('app_version', { version: app.getVersion() })
})

// Ipc event received from the client to restart Sheikah and install new version
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
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
} else {
  // Download witnet node when is production environment
  main()
}

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

  loadUrl(status)
  autoUpdater.checkForUpdatesAndNotify()

  win.webContents.on('did-finish-load', () => {
    // Disables zooming with pinch
    win.webContents.setZoomFactor(1)
  })

  win.webContents.on('new-window', (e, url) => {
    console.info('Opening link: ' + url + '  in os browser')
    e.preventDefault()

    shell.openExternal(url)
  })

  win.on('closed', () => {
    win = null
  })

  win.on('close', function(event) {
    console.info('Closing Sheikah window')
    event.preventDefault()
    if (process.platform === 'darwin') {
      if (!forceQuit) {
        if (win.isFullScreen()) {
          win.once('leave-full-screen', () => win.hide())
          win.setFullScreen(false)
        } else {
          win.hide()
        }
      } else {
        console.info('Sending shutdown message to Sheikah')
        win.webContents.send('shutdown')
      }
    } else {
      if (win.isFullScreen()) {
        win.once('leave-full-screen', () => win.hide())
        win.setFullScreen(false)
      } else {
        win.hide()
      }
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
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
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
        console.info('Sending shutdown message to Sheikah')
        win.webContents.send('shutdown')
      },
    },
  ])
  tray.setToolTip('Sheikah - Witnet wallet and data request editor')
  tray.setContextMenu(contextMenu)
}

async function downloadWalletRelease(releaseUrl, version) {
  status = STATUS.WAIT
  loadUrl(STATUS.WAIT)
  const file = path.join(SHEIKAH_PATH, FILE_NAME[platform])
  return new Promise((resolve, reject) => {
    axios
      .get(releaseUrl, { responseType: 'stream' })
      .then(async response => {
        const str = progress({
          length: response.headers['content-length'],
          time: 100 /* ms */,
        })
        str.on('progress', function(progress) {
          win.webContents.send('progress', progress)
        })
        const pipeline = util.promisify(stream.pipeline)
        // Promise equivalent for response.data.pipe(writeStream)
        await pipeline(response.data, str, fs.createWriteStream(file))
        console.info('witnet release downloaded succesfully')
        console.info('Decompressing release...')
        // Decompress tar.gz file
        try {
          const currentCwd = process.cwd()
          process.chdir(SHEIKAH_PATH)
          cp.execSync(`tar -xvf ${file}`)
          process.chdir(currentCwd)
        } catch (err) {
          console.error(err)
        }
        await sleep(4000)
        resolve()
      })
      .catch(err => {
        console.error(
          'An error happened while trying to download the wallet',
          err,
        )
      })
  })
}

// load a url if browser window is ready according to the current status
function loadUrl(status) {
  if (win) {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(
        `${process.env.WEBPACK_DEV_SERVER_URL}#/${STATUS_PATH[status]}`,
      )
    } else {
      if (!createdProtocol) {
        createProtocol('app')
        createdProtocol = true
      }
      // Load the index.html when not in development
      win.loadURL(`app://./index.html/#/${STATUS_PATH[status]}`)
    }
  }
}

function main() {
  console.info('Fetching releases from: ' + LATEST_RELEASES_URL)
  axios.get(LATEST_RELEASES_URL).then(async result => {
    const release = result.data.assets.find(
      asset =>
        asset.browser_download_url.includes(arch) &&
        asset.browser_download_url.includes(platform),
    )
    if (release) {
      const releaseUrl = release.browser_download_url

      const releaseName = releaseUrl.split('/')[8]

      const latestReleaseVersion = releaseName.slice(
        0,
        releaseName.indexOf('-x86'),
      )
      console.info('Latest release version: ' + latestReleaseVersion)
      if (!fs.existsSync(SHEIKAH_PATH)) {
        console.info(
          "Sheikah's directory not found. Create a new one in: ",
          SHEIKAH_PATH,
        )
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

      if (existWitnetFile) console.info("Witnet's wallet file found")
      if (existConfigFile) console.info("Witnet's config file found")
      if (existVersionFile) console.info("Witnet's version file found")

      const isLastestVersion = existConfigFile && existWitnetFile

      if (!isLastestVersion) {
        win.webContents.send('downloading')
        await sleep(2500)
        await downloadWalletRelease(releaseUrl, latestReleaseVersion)
      } else {
        win.webContents.send('downloaded')
        await sleep(3000)
      }
      runWallet()
    } else {
      status = STATUS.OS_NOT_SUPPORTED
      loadUrl(status)

      console.info('Your OS is not supported yet')
    }
  })
}

// Run Witnet wallet and load "ready" url
async function runWallet() {
  console.info('Running wallet...')
  win.webContents.send('running')
  await sleep(3000)

  const walletConfigurationPath = path.join(SHEIKAH_PATH, 'witnet.toml')

  console.info('... with witnet.toml from ' + walletConfigurationPath)

  walletProcess = cp.spawn(path.join(SHEIKAH_PATH, 'witnet'), [
    '-c',
    walletConfigurationPath,
    '--trace',
    'wallet',
    'server',
  ])
  walletProcess.stdout.on('data', async function(data) {
    console.info('stdout: ' + data.toString())
    status = STATUS.READY
    win.webContents.send('loaded')
    await sleep(3000)
    loadUrl(status)
  })

  walletProcess.stderr.on('data', function(data) {
    console.info('stderr: ' + data.toString())
  })
}

async function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

autoUpdater.on('update-available', () => {
  win.webContents.send('update_available')
})
