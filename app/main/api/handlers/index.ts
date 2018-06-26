export { default as ping } from "./ping"
export { default as nop } from "./nop"

export type Handler<T> = (system: T, data: any) => Promise<any>
