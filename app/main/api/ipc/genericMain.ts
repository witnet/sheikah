/**
 * This interface abstracts away the underlying IPC communication from the
 * main process.
 */
export default interface GenericIpcMain {
  /** Function to receive events */
  on(channel: string, listener: Function): any
}
