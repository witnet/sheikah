import log from "app/common/logging"
import { Event } from "./synthetic"
export * from "app/common/ipc"

/**
 * Listener type specific to Electron's main-process.
 */
export type Listener = (e: Event, message: string) => Promise<void>

/**
 * Ipc interface type for Electron's main-proces that is specific
 * about which methods are actually used in the backend application.
 */
export type Ipc = {
  on(channel: string, listener: Listener): void
  removeAllListeners(channel: string): void
}

/**
 * Channels is an array of tuples where is tuple contains the name of a channel and a listener
 * function that should be bound to that channel.
 */
export type Channels = Array<[string, Listener]>

/**
 * Helper function that wires each channel and listener together using ipc.
 *
 * @param {T} ipc The ipc implementation to use for the wiring.
 * @param {Channels} channels The collection of channel/listener tuples to wire together.
 * @returns {void} Function used only for side-effects.
 */
export function createChannels(ipc: Ipc, channels: Channels) {
  channels.forEach(([channel, listener]) => {
    log.debug(`[IPC Main] Binding listener to channel ${channel}`)
    ipc.on(channel, listener)
  })
}

/**
 * Helper function that removes all listeners attached to each channel.
 *
 * @param {T} ipc The ipc implementation to use for the wiring.
 * @param {Channels} channels The collection of channel/listener tuples to wire together.
 * @returns {void} Function used only for side-effects.
 */
export function removeChannels(ipc: Ipc, channels: Array<string>) {
  channels.forEach((channel) => {
    log.debug(`[IPC Main] Unbinding listener from channel ${channel}`)
    ipc.removeAllListeners(channel)
  })
}
