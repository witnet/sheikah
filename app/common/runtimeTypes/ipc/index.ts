import * as t from "io-ts"

// Internal renderer error to abstract UI from IPC errors
export const GENERIC_IPC_ERROR = t.literal("GENERIC_IPC_ERROR")