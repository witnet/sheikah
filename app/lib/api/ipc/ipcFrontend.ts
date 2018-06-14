import * as IPCCommon from "./ipcCommon"
import IfaceIpcRenderer from "./ifaceIpcRenderer"
import {ElectronIpcRenderer} from "./electronIpcRenderer"

/** Holds promises and timers for each pending request */
const pendingRequests: {[method: string]: any} = {}

/** Keeps a count of sent requests */
let requestsCount = 0

/**
 * Function to manage the reception of IPC messages
 * @param {IfaceIpcRenderer} ipcRenderer
 */
export function manageIPCChannels(ipcRenderer: IfaceIpcRenderer = ElectronIpcRenderer) {
  ipcRenderer.on(IPCCommon.IPC_ASYNC_CHAN_NAME, handleAsyncMessage)
}

/**
 * Function to send async request to back-end
 * @param {string} method
 * @param params
 * @param {IfaceIpcRenderer} ipcRenderer
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export async function sendAsyncRequest(method: string, params: any,
                                       ipcRenderer: IfaceIpcRenderer = ElectronIpcRenderer,
                                       timeout = 5000): Promise<string> {
  // Build async request based on the method id and the content
  const asyncRequest = buildChanRequest(method, JSON.stringify(params))

  // Create a promise for each message
  const promise = new Promise<string>((resolve, reject) => {
    // Create the timeout and get a reference to the timer
    const timer = setTimeout(() => {
      // Unstore the resolver, rejecter and timer references from the map
      delete pendingRequests[asyncRequest.method]

      // Create error to be returned
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

/**
 * Function to handle messages coming from the async channel
 * @param event
 * @param args
 * @returns {Promise<void>}
 */
export async function handleAsyncMessage(event: any, args: any) {
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
}

/**
 * Function to build request to be sent in a channel to the back-end
 * @param {string} method
 * @param {string} params
 * @returns {ChanRequest}
 */
export function buildChanRequest(method: string, params: string): IPCCommon.ChanRequest {
  return { version: IPCCommon.IPC_VERSION, id: requestsCount++, method, params }
}

/**
 * Function to get number of pending requests
 * @returns {number}
 */
export function getNumPendingRequests() {
  return Object.keys(pendingRequests).length
}
