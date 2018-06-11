import * as ImportedMethodMap from "../handlers/backend/index"
import * as IPCCommon from "./ipcCommon"
import {ipcMain} from "electron"

/**
 * Imported methods
 * @type {{}}
 */
const methodMap: { [id: string]: any } = { ...ImportedMethodMap }

/** Keeps a count of sent responses */
let responsesCount = 0

/**
 * Function to build response
 * @param {ChanResCode} rspCode
 * @param {string} method
 * @param {string} params
 * @returns {ChanResponse}
 */
const buildChanResponse = (rspCode: IPCCommon.ChanResCode,
                           method: string, params: string): IPCCommon.ChanResponse => {
  return { code: rspCode, version: IPCCommon.IPC_VERSION, id: responsesCount++, method, params }
}

/**
 * Function to load asynchronous request method handlers
 * @param {{[p: string]: HandlerFunction}} methods
 */
export function loadAsyncReqMethodHandlers(methods: { [id: string]: IPCCommon.HandlerFunction }) {
  // Listen to asynchronous channel
  ipcMain.on(IPCCommon.IPC_ASYNC_CHAN_NAME, async (event: any, args: any) => {
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
  })
}

/**
 * Function to load synchronous request method handlers
 * @param {{[p: string]: HandlerFunction}} methods
 */
export function loadSyncReqMethodHandlers(methods: { [id: string]: IPCCommon.HandlerFunction }) {
  // Listen to synchronous channel
  ipcMain.on(IPCCommon.IPC_SYNC_CHAN_NAME, async (event: any, args: any) => {
    // Reconstruct request from serialized message
    const syncRequest: IPCCommon.ChanRequest = JSON.parse(args)

    // Check request validity
    if (!IPCCommon.isValidChanRequest(syncRequest)) {
      throw new Error("Malformed IPC request")
    }

    let response: IPCCommon.ChanResponse

    // Check if method is supported
    if (syncRequest.method in methods) {
      // Call matching method handler to get specific response
      const responseMessage = await methods[syncRequest.method](syncRequest.params)

      // Wrap response into a generic protocol response
      response = buildChanResponse(IPCCommon.ChanResCode.Ok,
        syncRequest.method, responseMessage)

    } else {
      // Wrap error message into a generic protocol response
      response = buildChanResponse(IPCCommon.ChanResCode.ErrUnknownMethod,
        syncRequest.method, `Unsupported method: ${syncRequest.method}`)
    }

    // Send message back to sender
    event.returnValue = JSON.stringify(response)
  })
}

/**
 * Function to manage all IPC methods in the backend
 */
export function manageIPCChannels() {
  // Get an array of all supported external method descriptors
  const asyncMethods = IPCCommon.getIPCMethodDescs(methodMap)

  // Handle the async reception of messages
  loadAsyncReqMethodHandlers(asyncMethods)
}
