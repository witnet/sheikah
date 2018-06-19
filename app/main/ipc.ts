import {Ipc, Channels} from "app/common/ipc"

/**
 * Helper function that wires each channel and listener together using ipc.
 *
 * @param {T} ipc The ipc implementation to use for the wiring.
 * @param {Channels} channels The collection of channel/listener tuples to wire together.
 * @returns {void} Function used only for side-effects.
 */
export function createChannels<T extends Ipc>(ipc: T, channels: Channels) {
  channels.forEach(([channel, listener]) => {
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
export function removeChannels<T extends Ipc>(ipc: T, channels: Array<string>) {
  channels.forEach((channel) => {
    ipc.removeAllListeners(channel)
  })
}
