import { ipcRenderer } from "electron"
export * from "app/common/ipc"

/**
 * Listener type specific to Electron's renderer-process
 */
export type Listener = (e: any, message: string) => void

/**
 * Ipc interface type for Electron's renderer-proces that is specific
 * about which methods are actually used in the frontend application.
 */
export interface Ipc {
  once(channel: string, listener: Listener): void,
  send(channel: string, ...args: Array<any>): void,
  sendSync(channel: string, ...args: Array<any>): any,
  removeAllListeners(channel: string): void,
}

/** A default implementation of `Ipc` that is just the one supplied by Electron */
export const electronIpc: Ipc = ipcRenderer

/** RequestIdGenerator interface */
export type RequestIdGenerator = () => number | string

/**
 * Factory function that returns a `RequestIdGenerator` function. This generator is not unique
 * but it's sequential and its period is `Number.MAX_SAFE_INTEGER` which should be more than
 * enough for the requirements of this application since having more than `Number.MAX_SAFE_INTEGER`
 * concurrent requests seems unlikely.
 */
export function idGeneratorFactory(): RequestIdGenerator {
  let current = 0

  return () => {
    current = (current + 1) % Number.MAX_SAFE_INTEGER

    return current
  }
}

/** A default ids generator for requests. */
export const idGenerator = idGeneratorFactory()

/** A default timeout to be used in IPC */
export const timeout = 3000
