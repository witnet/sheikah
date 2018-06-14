/**
 * Mocked ipc renderer implements the IIpcRenderer for printing to console.
 */
export const MockedIpcRenderer = {
  /** Function to receive events */
  on: (channel: string, listener: Function): any => {
    console.log("channel: ", channel)
    console.log("listener: ", listener)
  },

  /** Function to send messages */
  send: (channel: string, ...args: Array<any>): void => {
    console.log("channel: ", channel)
    console.log("args: ", args)
  }
}
