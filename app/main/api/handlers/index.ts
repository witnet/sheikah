import { JsonSerializable } from "app/common/serializers"
export { default as ping } from "./ping"
export { default as nop } from "./nop"
export { default as echo } from "./echo"
export { default as error } from "./error"

export type Handler<T> =
  (system: T, params: Array<JsonSerializable>) => Promise<JsonSerializable | void>
