export const asyncChannel = "async-msg"
export const syncChannel = "sync-msg"

export type Ipc<L> = {
  on(channel: string, listener: L): void;
  removeAllListeners(channel: string): void;
}
