import * as IPCCommon from "./ipcCommon"
import {ipcRenderer} from "electron"

/** Holds promises and timers for each pending request */
const pendingRequests: {[method: string]: any} = {}

/** Keeps a count of sent requests */
let requestsCount = 0

/**
 * Function to build request
 * @param {string} method
 * @param {string} params
 * @returns {ChanRequest}
 */
export const buildChanRequest = (method: string, params: string): IPCCommon.ChanRequest => {
  return { version: IPCCommon.IPC_VERSION, id: requestsCount++, method, params }
}

/**
 * Function to send async request to back-end
 * @param {ChanRequest} asyncRequest
 * @param {number} timeout
 * @returns {Promise<any>}
 */
export const sendAsyncRequest = async (asyncRequest: IPCCommon.ChanRequest,
                                       timeout = 5000): Promise<string> => {
  // Create a promise for each message
  const promise = new Promise<string>((resolve, reject) => {
    // Create the timeout and get a reference to the timer
    const timer = setTimeout(() => {
      const error = new Error(`Timed out after ${timeout}ms`)
      error.name = "TimeoutError"
      reject(error)
    }, timeout)

    // Store the resolver, rejecter and timer references
    pendingRequests[asyncRequest.method] = [resolve, reject, timer]
  })

  // Send the asynchronous request
  ipcRenderer.send(IPCCommon.IPC_ASYNC_CHAN_NAME, JSON.stringify(asyncRequest))

  // Return the promise
  return promise
}

/** Function to handle async responses */
export function handleAsyncResponses() {
  // Listen to asynchronous channel
  ipcRenderer.on(IPCCommon.IPC_ASYNC_CHAN_NAME, async (event: any, args: any) => {
    // Reconstruct response from serialized message
    const asyncResponse: IPCCommon.ChanResponse = JSON.parse(args)

    // Check response validity
    if (!IPCCommon.isValidChanResponse(asyncResponse)) {
      throw new Error("Malformed IPC request")
    }

    // Find request for which this is a response
    if (asyncResponse.method in pendingRequests) {
      // Get registered information when pending requests
      const [resolve, reject, timer] = pendingRequests[asyncResponse.method]

      // As we got a response, unset the timer
      clearTimeout(timer)

      // Resolve or reject depending on success or error
      if (asyncResponse.code !== IPCCommon.ChanResCode.Ok) {
        reject(asyncResponse.code)
      } else {
        resolve(asyncResponse.params)
      }
    } else {
      // ignore it? probably a late response (arrived after timeout)
      // ... or perhaps a request message coming from main
    }
  })
}
