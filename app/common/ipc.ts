import {Event} from "electron"

export const asyncChannel = "async-msg"
export const syncChannel = "sync-msg"

export type Listener = (e: Event, args: any) => void

export type Ipc = {
  on(channel: string, listener: Listener): void;
  removeAllListeners(channel: string): void;
}

export type Channels = Array<[string, Listener]>
