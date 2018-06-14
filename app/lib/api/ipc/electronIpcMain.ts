import {ipcMain} from "electron"

/**
 * Implements the IfaceIpcMain for electron IPC.
 */
export const ElectronIpcMain = {
  /** Function to receive messages */
  on: (channel: string, listener: Function): any => {
    return ipcMain.on(channel, listener)
  },
}
