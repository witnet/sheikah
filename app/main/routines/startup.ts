const { ipcMain } = require("electron")

import { config } from "app/common/config"
import { asyncChannel, deadLetterChannel, syncChannel } from "app/common/ipc"
import { asRuntimeType, Contexts } from "app/common/runtimeTypes"
import { WalletInfos } from "app/common/runtimeTypes/storage/wallets"
import * as api from "app/main/api"
import * as ipc from "app/main/ipc"
import { SubSystems } from "app/main/system"
import * as ui from "app/main/ui"

/**
 * Startup routine.
 * It defines the workflow that the main process follows when cold starting.
 * @param system
 */
export default async function startupRoutine(system: SubSystems) {
  const returned = await Promise.all([
    // Initialize app state
    stateStart(system),
    // Initialize IPC channels
    ipcStart(system),
    // Start Electron UI
    uiStart()
  ])

  return { channels: returned[1] }
}

/**
 * Initialize app state.
 * @param system
 */
async function stateStart(system: SubSystems) {
  // Get and parse wallets from storage
  const _wallets = await system.appStorage.get("walletInfos")
  const walletInfos = asRuntimeType(_wallets, WalletInfos, Contexts.STORAGE)

  system.appStateManager.update({ appInfo: config.appInfo, walletInfos })
}

/**
 * Start IPC handlers.
 * @param system
 */
async function ipcStart(system: SubSystems) {
  const channels: ipc.Channels = [
    [asyncChannel, api.asyncListenerFactory(system, api.routes)],
    [syncChannel, api.syncListenerFactory(system, api.routes)],
    [deadLetterChannel, api.deadLetterListener]
  ]
  ipc.createChannels(ipcMain, channels)

  return channels
}

/**
 * Start UI (renderer process).
 */
async function uiStart() {
  ui.createMainWindow()

  return
}
