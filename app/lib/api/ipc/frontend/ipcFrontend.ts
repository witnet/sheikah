import * as IPCMessages from "../common/messages"
import * as IPCMethods from "../common/methods"
import GenericIpcRenderer from "./genericIpcRenderer"
import {electronIpcRenderer} from "./electronIpcRenderer"

/** Holds promises and timers for each pending request */
const pendingRequests: {[method: string]: any} = {}

/** Keeps a count of sent requests */
let requestsCount = 0

/**
 * Function to manage the reception of IPC messages
 * @param {GenericIpcRenderer} ipcRenderer
 */
export function loadChannels(ipcRenderer: GenericIpcRenderer = electronIpcRenderer) {
  ipcRenderer.on(IPCMethods.IPC_ASYNC_CHAN_NAME, handleAsyncMessage)
}

/**
 * Function to send async request to back-end
 * @param {string} method
 * @param data
 * @param {GenericIpcRenderer} ipcRenderer
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export async function sendAsyncRequest(method: string, data: any,
                                       ipcRenderer: GenericIpcRenderer = electronIpcRenderer,
                                       timeout = 5000): Promise<string> {
  // Build async request based on the method id and the content
  const asyncRequest = IPCMessages.buildChannelReq(requestsCount++, method, JSON.stringify(data))

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
  ipcRenderer.send(IPCMethods.IPC_ASYNC_CHAN_NAME, JSON.stringify(asyncRequest))

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
  // Parse serialized message as JSON
  const parsedArgs = JSON.parse(args)

  // Check if received serialized message is a channel response
  if (!IPCMessages.isChannelRes(parsedArgs)) {
    throw new Error("Malformed async IPC response")
  }

  // Reconstruct response from serialized message
  const response: IPCMessages.ChannelRes = parsedArgs

  // Resolve or reject depending on success or error
  if (!IPCMessages.isValidChannelRes(response)) {
    throw new Error("Invalid IPC response")
  }

  // Find request for which this is a response
  if (response.method in pendingRequests) {
    // Get registered information when pending requests
    const [resolve, reject, timer] = pendingRequests[response.method]

    // As we got a response, unset the timer
    clearTimeout(timer)

    // Unstore the resolver, rejecter and timer references from the map
    delete pendingRequests[response.method]

    // Check if response was successful or not
    if ("data" in response) {
      resolve(response.data)
    } else {
      reject(response.errorCode)
    }
  } else {
    // ignore it? probably a late response (arrived after timeout)
    // ... or perhaps a request message coming from main
  }
}

/**
 * Function to get number of pending requests
 * @returns {number}
 */
export function getNumPendingRequests() {
  return Object.keys(pendingRequests).length
}