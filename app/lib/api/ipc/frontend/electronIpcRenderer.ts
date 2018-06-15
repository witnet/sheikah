import {ipcRenderer} from "electron"

/**
 * Implements the GenericIpcRenderer interface for electron IPC.
 */
export const electronIpcRenderer = {
  /** Function to receive messages */
  on: (channel: string, listener: Function): any => {
    return ipcRenderer.on(channel, listener)
  },

  /** Function to send messages */
  send: (channel: string, ...args: Array<any>): void => {
    ipcRenderer.send(channel, args)
  },
}
