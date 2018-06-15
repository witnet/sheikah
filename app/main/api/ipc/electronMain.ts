import {ipcMain} from "electron"

/**
 * Implements the GenericIpcMain interface for electron IPC.
 */
export const electronIpcMain = {
  /** Function to receive messages */
  on: (channel: string, listener: Function): any => {
    return ipcMain.on(channel, listener)
  }
}
