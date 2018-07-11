const { app, ipcMain } = require("electron")

import { config } from "app/common/config"
import { inDarwin, inDevelopment } from "app/common/env"
import { Channels } from "app/main/ipc"
import startupRoutine from "app/main/routines/startup"
import * as ipc from "./ipc"
import { appSystem } from "./system"

let channels: Channels

app.on("window-all-closed", () => {
  if (!inDarwin) { app.quit() }
})
app.on("ready", startApplication)
app.on("will-quit", stopApplication)

if (inDevelopment) {
  const log = require("electron-log")
  log.transports.console.level = log.transports.file.level = "debug"
  app.commandLine.appendSwitch("remote-debugging-port", "9222")
} else {
  const sourceMapSupport = require("source-map-support")
  sourceMapSupport.install()
}

/**
 * Helper function to stop application services gracefully.
 */
async function stopApplication() {
  ipc.removeChannels(ipcMain, channels.map(([chanName]) => chanName))
  await appSystem.stop()
}

/**
 * Helper function to start application services.
 */
async function startApplication() {
  const [system] = await Promise.all([
    appSystem.start(config),
    installExtensions()
  ])
  const {channels: _channels} = await startupRoutine(system)
  channels = _channels
}

/**
 * Helper function to install application dev extensions.
 */
async function installExtensions() {
  if (!inDevelopment) {
    return
  }
  const installer = require("electron-devtools-installer")
  const extensions = [
    "REACT_DEVELOPER_TOOLS",
    "REDUX_DEVTOOLS"
  ]
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)))
}
