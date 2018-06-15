/**
 * This interface abstracts away the underlying IPC communication from the
 * renderer process.
 */
export default interface GenericIpcRenderer {
  /** Function to receive events */
  on(channel: string, listener: Function): any

  /** Function to send messages */
  send(channel: string, ...args: Array<any>): void
}
