import * as ImportedMethods from "../handlers/index"
import * as IPCMessages from "../../../../app/common/messages"
import * as IPCMethods from "../../../../app/common/methods"
import GenericIpcMain from "./genericMain"
import {electronIpcMain} from "./electronMain"

/**
 * Raw imported methods from handlers directory
 * @type {{PingMethodDesc; NopMethodDesc}}
 */
const rawMethods: { [id: string]: any } = { ...ImportedMethods }

/** Supported sync method descriptors */
let syncMethods: {[id: string]: IPCMethods.Handler} = {}

/** Supported async method descriptors */
let asyncMethods: {[id: string]: IPCMethods.Handler} = {}

/** Keeps a count of sent responses */
let responsesCount = 0

/**
 * Function to load all IPC channels
 */
export function loadChannels(ipcMain: GenericIpcMain = electronIpcMain) {
  loadAsyncChannels(ipcMain)
  loadSyncChannels(ipcMain)
}

/**
 * Function to load async IPC methods
 */
function loadAsyncChannels(ipcMain: GenericIpcMain = electronIpcMain) {
  // Get method descriptors
  asyncMethods = IPCMethods.getMethodDescs(rawMethods, IPCMethods.MethodType.Async)

  // Handle reception of messages in the channel
  ipcMain.on(IPCMethods.IPC_ASYNC_CHAN_NAME, handleAsyncMessage)
}

/**
 * Function to load sync IPC methods
 */
function loadSyncChannels(ipcMain: GenericIpcMain = electronIpcMain) {
  // Get method descriptors
  syncMethods = IPCMethods.getMethodDescs(rawMethods, IPCMethods.MethodType.Sync)

  // Handle reception of messages in the channel
  ipcMain.on(IPCMethods.IPC_SYNC_CHAN_NAME, handleSyncMessage)
}

/**
 * Function to handle messages coming from the async channel
 * @param event
 * @param args
 */
async function handleAsyncMessage(event: any, args: any) {
  // Parse serialized message as JSON
  const parsedArgs = JSON.parse(args)

  // Check if received serialized message is a channel request
  if (!IPCMessages.isChannelReq(parsedArgs)) {
    throw new Error("Malformed async IPC request")
  }

  // Reconstruct request from serialized message
  const request: IPCMessages.ChannelReq = parsedArgs

  // Response variable
  let response: IPCMessages.ChannelRes

  // Check request validity
  if (!IPCMessages.isValidChannelReq(request)) {
    // Wrap error message into a generic protocol response
    response = IPCMessages.buildErrorChannelRes(responsesCount++, request.method,
      IPCMessages.ChannelErrCode.ErrInvalidChannelReq,  `Invalid request`)
  } else {
    // Check if method is supported
    if (request.method in asyncMethods) {
      // Call matching method handler to get specific response
      const responseMessage = await asyncMethods[request.method](request.data)

      // Wrap response into a generic protocol response
      response = IPCMessages.buildSuccessChannelRes(responsesCount++,
        request.method, responseMessage)
    } else {
      // Wrap error message into a generic protocol response
      response = IPCMessages.buildErrorChannelRes(responsesCount++, request.method,
        IPCMessages.ChannelErrCode.ErrUnknownMethod,  `Unsupported method: ${request.method}`)
    }
  }

  // Send the wrapped response back
  event.sender.send(IPCMethods.IPC_ASYNC_CHAN_NAME, JSON.stringify(response))
}

/**
 * Function to handle messages coming from the sync channel
 * @param event
 * @param args
 */
async function handleSyncMessage(event: any, args: any) {
  // Parse serialized message as JSON
  const parsedArgs = JSON.parse(args)

  // Check if received serialized message is a channel request
  if (!IPCMessages.isChannelReq(parsedArgs)) {
    throw new Error("Malformed async IPC request")
  }

  // Reconstruct request from serialized message
  const request: IPCMessages.ChannelReq = parsedArgs

  // Response variable
  let response: IPCMessages.ChannelRes

  // Check request validity
  if (!IPCMessages.isValidChannelReq(request)) {
    // Wrap error message into a generic protocol response
    response = IPCMessages.buildErrorChannelRes(responsesCount++, request.method,
      IPCMessages.ChannelErrCode.ErrInvalidChannelReq,  `Invalid request`)
  } else {
    // Check if method is supported
    if (request.method in syncMethods) {
      // Call matching method handler to get specific response
      const responseMessage = await syncMethods[request.method](request.data)

      // Wrap response into a generic protocol response
      response = IPCMessages.buildSuccessChannelRes(responsesCount++,
        request.method, responseMessage)
    } else {
      // Wrap error message into a generic protocol response
      response = IPCMessages.buildErrorChannelRes(responsesCount++, request.method,
        IPCMessages.ChannelErrCode.ErrUnknownMethod,  `Unsupported method: ${request.method}`)
    }
  }

  // Send message back to sender
  event.returnValue = JSON.stringify(response)
}