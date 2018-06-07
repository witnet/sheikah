import * as ImportedChanMap from "../handlers/frontend/index"
import * as IPCCommon from "./ipcCommon"
import {ipcRenderer} from "electron"

/**
 * Imported channels
 * @type {{}}
 */
const chanMap: { [id: string]: any } = { ...ImportedChanMap }

/**
 * Function to manage all IPC channels in the frontend
 */
export function manageIPCChannels() {
  // Get an array of all supported external channel descriptors
  const channels = IPCCommon.getIPCChanDescs(chanMap)

  // Handle the reception of messages for those channels
  IPCCommon.loadResponseHandlers(ipcRenderer, channels)
}