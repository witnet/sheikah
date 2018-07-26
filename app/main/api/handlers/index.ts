import { JsonSerializable } from "app/common/serializers"
export { default as getState } from "./getState"
export { default as getWallet } from "./getWallet"
export { default as getWallets } from "./getWallets"
export { default as ping } from "./ping"
export { default as nop } from "./nop"
export { default as echo } from "./echo"
export { default as error } from "./error"
export { default as newMnemonics } from "./newMnemonics"
export { default as validateMnemonics } from "./validateMnemonics"
export { default as encryptWallet } from "./encryptWallet"

export type Handler<T> =
  (system: T, params: JsonSerializable) => Promise<JsonSerializable | void>
