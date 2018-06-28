const { app, ipcMain } = require("electron")

import { inDevelopment, inDarwin } from "app/common/env"
import { config } from "app/common/config"
import { asyncChannel, syncChannel, deadLetterChannel } from "app/common/ipc"
import { Channels } from "app/main/ipc"
import { appSystem } from "./system"
import * as api from "./api"
import * as ui from "./ui"
import * as ipc from "./ipc"

let channels: Channels

app.on("window-all-closed", () => {
  if (!inDarwin) { app.quit() }
})
app.on("ready", startApplication)
app.on("will-quit", stopApplication)

if (inDevelopment) {
  const log = require("electron-log")
  log.transports.console.level = log.transports.file.level = "debug"
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
  channels = [
    [asyncChannel, api.asyncListenerFactory(system, api.routes)],
    [syncChannel, api.syncListenerFactory(system, api.routes)],
    [deadLetterChannel, api.deadLetterListener]
  ]
  ipc.createChannels(ipcMain, channels)
  ui.createMainWindow()
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
