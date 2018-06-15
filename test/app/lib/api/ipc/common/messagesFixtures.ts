import * as IPCMessages from "app/lib/api/ipc/common/messages"

/*
 * Test vectors for IPCMessages library
 */
export const channelMessages = {
  valid: [
    { version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg" }
  ],

  invalid: [
    // invalid version
    { version: IPCMessages.IPC_VERSION + 1, id: 1, method: "test-msg" },
  ]
}

export const channelRequests = {
  valid: [
    { version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg", data: "test-data" }
  ],

  invalid: [
    // invalid version
    { version: IPCMessages.IPC_VERSION + 1, id: 1, method: "test-msg", data: "test-data" }
  ]
}

export const successChannelResponses = {
  valid: [
    { version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg", data: "test-data" }
  ],

  invalid: [
    // invalid version
    { version: IPCMessages.IPC_VERSION + 1, id: 1, method: "test-msg", data: "test-data" }
  ]
}

export const errorChannelResponses = {
  valid: [
    { errorCode: IPCMessages.ChannelErrCode.ErrUnknownMethod, errorDesc: "test-desc",
      version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg", data: "test-data" },
    { errorCode: IPCMessages.ChannelErrCode.ErrInvalidChannelReq, errorDesc: "test-desc",
      version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg", data: "test-data" },
  ],

  invalid: [
    // invalid error code -> this should give an error (how to values check
    // in enum?)
    //{ errorCode: 50, errorDesc: "test-desc",
    //  version: IPCMessages.IPC_VERSION, id: 1, method: "test-msg", data: "test-data" },
    // invalid version
    { errorCode: IPCMessages.ChannelErrCode.ErrInvalidChannelReq, errorDesc: "test-desc",
      version: IPCMessages.IPC_VERSION + 1, id: 1, method: "test-msg", data: "test-data" },
  ]
}