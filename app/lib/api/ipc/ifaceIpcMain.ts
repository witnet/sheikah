/**
 * This interface abstracts away the underlying IPC communication from the
 * main.
 */
export default interface IfaceIpcMain {
  /** Function to receive events */
  on(channel: string, listener: Function): any
}
