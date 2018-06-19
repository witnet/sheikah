import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from "electron"
import {inDevelopment, inDarwin} from "app/common/env"

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

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.webContents.on("did-finish-load", () => {
    if (mainWindow) {
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
      }]).popup(mainWindow)
    })
  }

  if (inDarwin) {
    template = [{
      label: "Electron",
      submenu: [{
        label: "About ElectronReact"
      }, {
        type: "separator"
      }, {
        label: "Services",
        submenu: []
      }, {
        type: "separator"
      }, {
        label: "Hide ElectronReact",
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
      submenu: (process.env.NODE_ENV === "development") ? [{
        label: "Reload",
        accelerator: "Command+R",
        click() {
          if (mainWindow) {
            mainWindow.webContents.reload()
          }
        }
      }, {
        label: "Toggle Full Screen",
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
        label: "Toggle Full Screen",
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
        label: "Close",
        accelerator: "Command+W"
      }, {
        type: "separator"
      }, {
        label: "Bring All to Front"
      }]
    }, {
      label: "Help",
      submenu: [{
        label: "Learn More",
        click() {
          shell.openExternal("http://electron.atom.io")
        }
      }, {
        label: "Documentation",
        click() {
          shell.openExternal("https://github.com/atom/electron/tree/master/docs#readme")
        }
      }, {
        label: "Community Discussions",
        click() {
          shell.openExternal("https://discuss.atom.io/c/electron")
        }
      }, {
        label: "Search Issues",
        click() {
          shell.openExternal("https://github.com/atom/electron/issues")
        }
      }]
    }]

    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    template = [{
      label: "&File",
      submenu: [{
        label: "&Open",
        accelerator: "Ctrl+O"
      }, {
        label: "&Close",
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
        label: "Learn More",
        click() {
          shell.openExternal("http://electron.atom.io")
        }
      }, {
        label: "Documentation",
        click() {
          shell.openExternal("https://github.com/atom/electron/tree/master/docs#readme")
        }
      }, {
        label: "Community Discussions",
        click() {
          shell.openExternal("https://discuss.atom.io/c/electron")
        }
      }, {
        label: "Search Issues",
        click() {
          shell.openExternal("https://github.com/atom/electron/issues")
        }
      }]
    }]
    menu = Menu.buildFromTemplate(template)
    mainWindow.setMenu(menu)
  }
}
