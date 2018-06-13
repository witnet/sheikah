import * as IPCCommon from "app/lib/api/ipc/ipcCommon"

/*
 * Test vectors for IPCCommon library
 */
export const methodDescs = {
  valid: [
    { id: "test-msg", handler: () => undefined }
  ],

  invalid: [
    { id: "test-msg", handler: "handler-msg" },
    { id: 1, handler: () => undefined },
    { id: "test-msg" },
    { handler: () => undefined },
    "test-method"
  ]
}
export const chanMessages = {
  valid: [
    { version: 1, id: 1, method: "test-msg", params: "test-params" }
  ],

  invalid: [
    { version: 2, id: 1, method: "test-msg", params: "test-params" }
  ]
}

export const chanRequests = {
  valid: [
    { version: 1, id: 1, method: "test-msg", params: "test-params" }
  ],

  invalid: [
    { version: 2, id: 1, method: "test-msg", params: "test-params" }
  ]
}

export const chanResponses = {
  valid: [
    { code: IPCCommon.ChanResCode.Ok, version: 1, id: 1,
      method: "test-msg", params: "test-params" }
  ],

  invalid: [
    { code: IPCCommon.ChanResCode.ErrUnknownMethod, version: 1, id: 1,
      method: "test-msg", params: "test-params" },
    { code: IPCCommon.ChanResCode.Ok, version: 2, id: 1,
      method: "test-msg", params: "test-params" }
  ]
}

const functionA = () => undefined
const functionB = () => undefined
export const importedIPCMethods: { [id: string]: any } = {
  AMethodDesc: { id: "a-msg", handler: functionA },
  BMethodDesc: { id: "b-msg", handler: functionB }
}
export const exportedIPCMethods = { "a-msg": functionA, "b-msg": functionB }