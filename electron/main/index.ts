// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, '../public')

import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { Status, STATUS_PATH } from '../constants'
import { WalletManager } from '../walletManager'
import kill from 'tree-kill'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let status: Status
let walletPid
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.png'),
    // TODO: set sheikah icon
    // icon: path.join(__static, 'icon.png'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  })

  // TODO: Do we need this?
  // if (!DEVELOPMENT) {
  //   // Hide electron toolbar in production environment
  //   this.win.setMenuBarVisibility(false)
  //   const menu = Menu.buildFromTemplate([
  //     {
  //       label: 'Menu',
  //       submenu: [
  //         {
  //           label: 'Quit',
  //           accelerator: 'CmdOrCtrl+Q',
  //           click: () => {
  //             this.sendShutdownMessage()
  //           },
  //         },
  //         { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => {} },
  //         { label: 'ZoomOut', accelerator: 'CmdOrCtrl+-', click: () => {} },
  //         { label: 'ZoomIn', accelerator: 'CmdOrCtrl+Plus', click: () => {} },
  //         { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
  //         { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
  //         { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
  //       ],
  //     },
  //   ])
  //   Menu.setApplicationMenu(menu)
  // }

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    loadUrl(Status.Wait)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    // TODO: do we need this?
    // this.win?.webContents.setZoomFactor(1)
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // TODO: Do we need this?
  // win.on('closed', () => {
  //   this.win = null
  // })
}

// TODO: Do we need this?

// // check if the second instance in locked
// const lock = app.requestSingleInstanceLock()

// if (!lock) {
//   app.quit()
// } else {
//   app.whenReady().then(() => {})
// }

function setWalletPid(pid: number) {
  walletPid = pid
}

export type Actions = {
  sendShutdownMessage: () => unknown
  sendDownloadedMessage: () => unknown
  sendDownloadingMessage: () => unknown
  sendProgressMessage: (p: number) => void
  sendRunningMessage: () => unknown
  sendLoadedMessage: () => unknown
  closeWindow: () => unknown
  setStatus: (status: Status) => unknown
  setWalletPid: (pid: number) => unknown
}

const actions: Actions = {
  sendShutdownMessage: sendShutdownMessage,
  sendDownloadedMessage: sendDownloadedMessage,
  sendDownloadingMessage: sendDownloadingMessage,
  sendProgressMessage: sendProgressMessage,
  sendRunningMessage: sendRunningMessage,
  sendLoadedMessage: sendLoadedMessage,
  closeWindow: closeWindow,
  setStatus: setStatus,
  setWalletPid: setWalletPid,
}

const walletManager = new WalletManager()
walletManager.run(actions)

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})
// TODO: review this
//     app.on('window-all-closed', (event: Event) => {
//       event.preventDefault()
//       this.sendShutdownMessage()
//     })

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // TODO: should this be used?
  ipcMain.on('shutdown-finished', () => {
    win?.hide()
    if (walletPid) {
      kill(walletPid)
    }
    app.exit()
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    // childWindow.loadURL(`${url}#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

function sendShutdownMessage() {
  win?.webContents.send('shutdown')
}

function sendDownloadedMessage() {
  win?.webContents.send('downloaded')
}

function sendDownloadingMessage() {
  win?.webContents.send('downloading')
}

function sendProgressMessage(progress: number) {
  win?.webContents.send('progress', progress)
}

function sendRunningMessage() {
  win?.webContents.send('running')
}

function sendLoadedMessage() {
  win?.webContents.send('loaded', [{ isDefaultWallet: true }])
}

function closeWindow() {
  win.close()
}

win?.on('close', closeApp.bind(this))
function closeApp(event: Event) {
  event.preventDefault()
  this.sendShutdownMessage()
}

function setStatus(s: Status) {
  status = s
  loadUrl(status)
}

// load a url if browser window is ready according to the current status
function loadUrl(status: Status) {
  if (win) {
    if (url) {
      // Load the url of the dev server if in development mode
      win.loadURL(`${url}#/${STATUS_PATH[status]}`)
    } else {
      // TODO: handle load url pro
      // Load the index.html when not in development
      // this.win.loadURL(`app://./index.html/#/${STATUS_PATH[status]}`)
    }
  }
}