import * as IPCMethods from "app/lib/api/ipc/common/methods"

/*
 * Test vectors for IPCMethods library
 */
export const methodDescs = {
  valid: [
    { id: "test-msg", type: IPCMethods.MethodType.Async, handler: () => undefined }
  ],

  invalid: [
    // invalid handler type
    { id: "test-msg", type: IPCMethods.MethodType.Async, handler: "handler-msg" },
    // invalid id type
    { id: 1, type: IPCMethods.MethodType.Async, handler: () => undefined },
    // no handler
    { id: "test-msg", type: IPCMethods.MethodType.Async },
    // no id
    { type: IPCMethods.MethodType.Async, handler: () => undefined },
    // no type
    { id: "test-msg", handler: () => undefined },
    // no object
    "test-method"
  ]
}

const handlerFunc = () => undefined
export const importedIPCMethods: { [id: string]: any } = {
  AMethodDesc: { id: "a-msg", type: IPCMethods.MethodType.Async, handler: handlerFunc },
  BMethodDesc: { id: "b-msg", type: IPCMethods.MethodType.Sync, handler: handlerFunc },
  CMethodDesc: { id: "c-msg", type: IPCMethods.MethodType.Async, handler: handlerFunc },
  DMethodDesc: { id: "d-msg", type: IPCMethods.MethodType.Sync, handler: handlerFunc },
}
export const exportedAsyncIPCMethods = { "a-msg": handlerFunc, "c-msg": handlerFunc }
export const exportedSyncIPCMethods = { "b-msg": handlerFunc, "d-msg": handlerFunc }
