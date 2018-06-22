import {Ipc} from "app/common/ipc"
import {Event} from "./synthetic"

export type Listener = (e: Event, args: any) => void
export type Channels = Array<[string, Listener]>

/**
 * Helper function that wires each channel and listener together using ipc.
 *
 * @param {T} ipc The ipc implementation to use for the wiring.
 * @param {Channels} channels The collection of channel/listener tuples to wire together.
 * @returns {void} Function used only for side-effects.
 */
export function createChannels(ipc: Ipc<Listener>, channels: Channels) {
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
export function removeChannels(ipc: Ipc<Listener>, channels: Array<string>) {
  channels.forEach((channel) => {
    ipc.removeAllListeners(channel)
  })
}
