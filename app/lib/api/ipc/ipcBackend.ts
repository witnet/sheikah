import * as ImportedMethodMap from "../handlers/backend/index"
import * as IPCCommon from "./ipcCommon"
import IfaceIpcMain from "./ifaceIpcMain"
import {ElectronIpcMain} from "./electronIpcMain"

/**
 * Imported methods for the async channel
 * @type {{}}
 */
const methodMap: { [id: string]: any } = { ...ImportedMethodMap }

/** Holds supported method descriptors */
let methods: {[id: string]: IPCCommon.HandlerFunction} = {}

/** Keeps a count of sent responses */
let responsesCount = 0

/**
 * Function to manage all IPC methods in the backend
 */
export function manageIPCChannels(ipcMain: IfaceIpcMain = ElectronIpcMain) {
  // Get an array of all supported external method descriptors
  methods = IPCCommon.getIPCMethodDescs(methodMap)

  // Handle reception of messages in async channel
  ipcMain.on(IPCCommon.IPC_ASYNC_CHAN_NAME, handleAsyncMessage)
}

/**
 * Function to handle messages coming from the async channel
 * @param event
 * @param args
 */
async function handleAsyncMessage(event: any, args: any) {
  // Reconstruct request from serialized message
  const asyncRequest: IPCCommon.ChanRequest = JSON.parse(args)

  // Check request validity
  if (!IPCCommon.isValidChanRequest(asyncRequest)) {
    throw new Error("Malformed IPC request")
  }

  let response: IPCCommon.ChanResponse

  // Check if method is supported
  if (asyncRequest.method in methods) {
    // Call matching method handler to get specific response
    const responseMessage = await methods[asyncRequest.method](asyncRequest.params)

    // Wrap response into a generic protocol response
    response = buildChanResponse(IPCCommon.ChanResCode.Ok,
      asyncRequest.method, responseMessage)
  } else {
    // Wrap error message into a generic protocol response
    response = buildChanResponse(IPCCommon.ChanResCode.ErrUnknownMethod,
      asyncRequest.method, `Unsupported method: ${asyncRequest.method}`)
  }

  // Send the wrapped response back
  event.sender.send(IPCCommon.IPC_ASYNC_CHAN_NAME, JSON.stringify(response))
}

///**
// * Function to load synchronous request method handlers
// * @param {{[p: string]: HandlerFunction}} methods
// * @param {IfaceIpcMain} ipcMain
// */
//function handleSyncChannel(methods: { [id: string]: IPCCommon.HandlerFunction },
//                           ipcMain: IfaceIpcMain = ElectronIpcMain) {
//  // Listen to synchronous channel
//  ipcMain.on(IPCCommon.IPC_SYNC_CHAN_NAME, async (event: any, args: any) => {
//    // Reconstruct request from serialized message
//    const syncRequest: IPCCommon.ChanRequest = JSON.parse(args)
//
//    // Check request validity
//    if (!IPCCommon.isValidChanRequest(syncRequest)) {
//      throw new Error("Malformed IPC request")
//    }
//
//    let response: IPCCommon.ChanResponse
//
//    // Check if method is supported
//    if (syncRequest.method in methods) {
//      // Call matching method handler to get specific response
//      const responseMessage = await methods[syncRequest.method](syncRequest.params)
//
//      // Wrap response into a generic protocol response
//      response = buildChanResponse(IPCCommon.ChanResCode.Ok,
//        syncRequest.method, responseMessage)
//
//    } else {
//      // Wrap error message into a generic protocol response
//      response = buildChanResponse(IPCCommon.ChanResCode.ErrUnknownMethod,
//        syncRequest.method, `Unsupported method: ${syncRequest.method}`)
//    }
//
//    // Send message back to sender
//    event.returnValue = JSON.stringify(response)
//  })
//}

/**
 * Function to build response
 * @param {ChanResCode} rspCode
 * @param {string} method
 * @param {string} params
 * @returns {ChanResponse}
 */
function buildChanResponse (rspCode: IPCCommon.ChanResCode, method: string,
                            params: string): IPCCommon.ChanResponse {
  return { code: rspCode, version: IPCCommon.IPC_VERSION, id: responsesCount++, method, params }
}
