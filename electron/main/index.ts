// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.ts    > Electron-Main
// │ └─┬ preload
// │   └── index.ts    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { release } from 'os'
import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { WalletManager } from '../walletManager'
import { IPC_ACTIONS } from '../ipc/ipcActions'
import { AutoUpdaterManager } from '../autoUpdaterManager'

const { SHUTDOWN, SHUTDOWN_FINISHED } = IPC_ACTIONS.Window

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = dirname(__filename)
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, '../public')

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let walletManager: WalletManager
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, '/icon.png'),
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      preload,
    },
    autoHideMenuBar: true,
  })

  walletManager = new WalletManager(win?.webContents)
  walletManager.run(actions)

  if (!process.env.VITE_DEV_SERVER_URL) {
    // Hide electron toolbar in production environment
    win.setMenuBarVisibility(false)
    const menu = Menu.buildFromTemplate([
      {
        label: 'Menu',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
              win.webContents.send(SHUTDOWN)
            },
          },
          { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => {} },
          { label: 'ZoomOut', accelerator: 'CmdOrCtrl+-', click: () => {} },
          { label: 'ZoomIn', accelerator: 'CmdOrCtrl+Plus', click: () => {} },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        ],
      },
    ])
    Menu.setApplicationMenu(menu)
  }

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    loadUrl()
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  }

  win.once('ready-to-show', () => {
    new AutoUpdaterManager(walletManager, win).run(actions)
  })

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.setZoomFactor(1)
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  win.on('closed', () => {
    win = null
  })
}

export type Actions = {
  closeWindow: () => unknown
  relaunch: () => unknown
  quitApp: () => unknown
  killWalletProcess: () => unknown
}

const actions: Actions = {
  relaunch: relaunch,
  closeWindow: closeWindow,
  quitApp: quitApp,
  killWalletProcess: killWalletProcess,
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('window-all-closed', (event: Event) => {
  event.preventDefault()
  win?.webContents.send(SHUTDOWN)
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

ipcMain.on(SHUTDOWN_FINISHED, () => {
  actions.killWalletProcess()
  actions.quitApp()
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

  ipcMain.on('shutdown-finished', () => {
    actions.killWalletProcess()
    actions.quitApp()
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    // TODO
    // childWindow.loadURL(`${url}#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

function closeWindow() {
  win.close()
}

function killWalletProcess() {
  if (walletManager.walletProcess) {
    walletManager.walletProcess.kill(9)
  }
}

function quitApp() {
  app.quit()
}

function relaunch() {
  app.relaunch()
}

win?.on('close', closeApp)

function closeApp(event: Event) {
  // FIXME: no event is received
  if (event) {
    event.preventDefault()
  }
  win?.webContents.send(SHUTDOWN)
  // window.electron.sendShutdownMessage()
}

// load a url if browser window is ready according to the current status
function loadUrl() {
  if (win) {
    if (url) {
      // Load the url of the dev server if in development mode
      win.loadURL(url)
    } else {
      // Load the index.html when not in development
      win.loadURL(`app://${indexHtml}`)
    }
  }
}
