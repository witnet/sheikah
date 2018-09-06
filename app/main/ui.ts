import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from "electron"
import { inDevelopment, inHotMode, inDarwin } from "app/common/env"

let menu: Menu
let template: Array<MenuItemConstructorOptions>
let mainWindow: BrowserWindow | undefined

/**
 * Function that creates the main window of the application.
 */
export function createMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  })

  const paths = require("app/../config/paths")
  const appHtml = inHotMode ?
    `file://${paths.templateAppHtml}` :
    `file://${paths.filenameAppHtml}`
  mainWindow.loadURL(appHtml)

  mainWindow.webContents.on("did-finish-load", () => {
    if (mainWindow) {
      mainWindow.maximize()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on("closed", () => {
    mainWindow = undefined
  })

  if (inDevelopment) {
    const electronDebug = require("electron-debug")
    electronDebug()
    electronDebug.openDevTools(mainWindow)
    mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      const { x, y } = props

      Menu.buildFromTemplate([{
        label: "Inspect element",
        click() {
          if (mainWindow) {
            mainWindow.webContents.inspectElement(x, y)
          }
        }
      }]).popup(props)
    })
  }

  if (inDarwin) {
    template = [{
      label: "Sheikah [Technology Preview]",
      submenu: [{
        label: "About Sheikah"
      }, {
        type: "separator"
      }, {
        label: "Services",
        submenu: []
      }, {
        type: "separator"
      }, {
        label: "Hide Sheikah",
        accelerator: "Command+H"
      }, {
        label: "Hide Others",
        accelerator: "Command+Shift+H"
      }, {
        label: "Show All"
      }, {
        type: "separator"
      }, {
        label: "Quit",
        accelerator: "Command+Q",
        click() {
          app.quit()
        }
      }]
    }, {
      label: "Edit",
      submenu: [{
        label: "Undo",
        accelerator: "Command+Z"
      }, {
        label: "Redo",
        accelerator: "Shift+Command+Z"
      }, {
        type: "separator"
      }, {
        label: "Cut",
        accelerator: "Command+X"
      }, {
        label: "Copy",
        accelerator: "Command+C"
      }, {
        label: "Paste",
        accelerator: "Command+V"
      }, {
        label: "Select All",
        accelerator: "Command+A"
      }]
    }, {
      label: "View",
      submenu: inDevelopment ? [{
        label: "Reload",
        accelerator: "Command+R",
        click() {
          if (mainWindow) {
            mainWindow.webContents.reload()
          }
        }
      }, {
        label: "Toggle full screen",
        accelerator: "Ctrl+Command+F",
        click() {
          if (mainWindow) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          }
        }
      }, {
        label: "Toggle Developer Tools",
        accelerator: "Alt+Command+I",
        click() {
          if (mainWindow) {
            mainWindow.webContents.toggleDevTools()
          }
        }
      }] : [{
        label: "Toggle full screen",
        accelerator: "Ctrl+Command+F",
        click() {
          if (mainWindow) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          }
        }
      }]
    }, {
      label: "Window",
      submenu: [{
        label: "Minimize",
        accelerator: "Command+M"
      }, {
        label: "Close Sheikah",
        accelerator: "Command+W"
      }, {
        type: "separator"
      }, {
        label: "Bring All to Front"
      }]
    }, {
      label: "Help",
      submenu: [{
        label: "About Witnet",
        click() {
          shell.openExternal("https://witnet.io")
        }
      }, {
        label: "About Sheikah",
        click() {
          shell.openExternal("https://github.com/witnet/sheikah")
        }
      }, {
        label: "Community Telegram group",
        click() {
          shell.openExternal("https://t.me/witnetio")
        }
      }, {
        label: "Developers discussion chatroom",
        click() {
          shell.openExternal("https://gitter.im/witnet/sheikah")
        }
      }, {
        label: "Report an issue on GitHub",
        click() {
          shell.openExternal("https://github.com/witnet/sheikah/issues")
        }
      }]
    }]

    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    template = [{
      label: "&File",
      submenu: [{
        label: "&Close Sheikah",
        accelerator: "Ctrl+W",
        click() {
          if (mainWindow) {
            mainWindow.close()
          }
        }
      }]
    }, {
      label: "&View",
      submenu: inDevelopment ? [{
        label: "&Reload",
        accelerator: "Ctrl+R",
        click() {
          if (mainWindow) {
            mainWindow.webContents.reload()
          }
        }
      }, {
        label: "Toggle &Full Screen",
        accelerator: "F11",
        click() {
          if (mainWindow) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          }
        }
      }, {
        label: "Toggle &Developer Tools",
        accelerator: "Alt+Ctrl+I",
        click() {
          if (mainWindow) {
            mainWindow.webContents.toggleDevTools()
          }
        }
      }] : [{
        label: "Toggle &Full Screen",
        accelerator: "F11",
        click() {
          if (mainWindow) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen())
          }
        }
      }]
    }, {
      label: "Help",
      submenu: [{
        label: "About Witnet",
        click() {
          shell.openExternal("https://witnet.io/")
        }
      }, {
        label: "About Sheikah",
        click() {
          shell.openExternal("https://github.com/witnet/sheikah")
        }
      }, {
        label: "Community Telegram group",
        click() {
          shell.openExternal("https://t.me/witnetio")
        }
      }, {
        label: "Developers discussion chatroom",
        click() {
          shell.openExternal("https://gitter.im/witnet/sheikah")
        }
      }, {
        label: "Report an issue on GitHub",
        click() {
          shell.openExternal("https://github.com/witnet/sheikah/issues")
        }
      }]
    }]
    menu = Menu.buildFromTemplate(template)
    mainWindow.setMenu(menu)
  }
}
