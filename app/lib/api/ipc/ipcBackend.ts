import * as ImportedChanMap from "../handlers/backend/index"
import * as IPCCommon from "./ipcCommon"
import {ipcMain} from "electron"

/**
 * Imported channels
 * @type {{}}
 */
const chanMap: { [id: string]: any } = { ...ImportedChanMap }

/**
 * Function to manage all IPC channels in the backend
 */
export function manageIPCChannels() {
  // Get an array of all supported external channel descriptors
  const channels = IPCCommon.getIPCChanDescs(chanMap)

  // Handle the reception of messages for those channels
  IPCCommon.loadRequestHandlers(ipcMain, channels)
}
