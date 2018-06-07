import IpcMain = Electron.IpcMain
import IpcRenderer = Electron.IpcRenderer

/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */

/** Version of the protocol */
export const ipcVersion = 1

/** Asynchronous communication channel */
export const asyncChanId = "async-msg"

/**
 * Type representing a handler function in an IPC call
 */
export type HandlerFunction = (args: string) => Promise<string>

/**
 * Channel description
 */
export type ChanDesc = {
  /** Id of the channel */
  id: string;

  /** Handler function for the reception of a message in the channel */
  chanHandler: HandlerFunction;
}

/**
 * Function to check the type for imported channels (they should match ChanDesc
 * interface)
 * @param elem
 * @returns {boolean}
 */
export function isValidChanDesc(elem: any): boolean {
  // check:
  // (1) if object
  // (2) if matches the ChanDesc interface (id: string, chanHandler: function)
  return (typeof elem === "object") &&
    ("id" in elem) && ("chanHandler" in elem) &&
    (typeof elem.id === "string") && (typeof elem.chanHandler === "function")
}

/**
 * Interface that represents a generic message in the IPC communication
 * (common fields for both requests and responses)
 */
export interface ChanMessage {
  /** Version */
  version: number,

  /** Unique transaction id of the message (for handling retries logic) */
  id: number,

  /** Message id */
  msgId: string,

  /** Content of the message (message specific, in JSON format) */
  msgContent: string
}

/**
 * Interface that represents a request in the IPC communication
 */
export interface ChanRequest extends ChanMessage {
}

/**
 * Interface that represents a response in the IPC communication
 */
export interface ChanResponse extends ChanMessage {
  /** Error code */
  code: ChanResCode
}

/**
 * Enum type for codes in the IPC communication
 */
export enum ChanResCode {
  Ok,
  ErrNoHandler
}

/**
 * Function to build a channel request
 * @param {string} reqMsgId
 * @param {string} reqMsgContent
 * @returns {ChanRequest}
 */
export function buildChanRequest(reqMsgId: string,
                                 reqMsgContent: string): ChanRequest {
  return {
    version: ipcVersion,
    id: 1,
    msgId: reqMsgId,
    msgContent: reqMsgContent
  }
}

/**
 * Function to build a channel response
 * @param {ChanResCode} rspCode
 * @param {string} rspMsgId
 * @param {string} rspMsgContent
 * @returns {ChanResponse}
 */
export function buildChanResponse(rspCode: ChanResCode,
                                  rspMsgId: string,
                                  rspMsgContent: string): ChanResponse {
  return {
    code: rspCode,
    version: ipcVersion,
    id: 1,
    msgId: rspMsgId,
    msgContent: rspMsgContent
  }
}

/**
 * Function to check the header in the communication protocol
 * @param {number} version
 * @param {number} id
 * @returns {boolean}
 */
export function isValidChanMessage(chanMsg: ChanMessage): boolean {
  return (chanMsg.version === ipcVersion)
}

/**
 * Function to check a request
 * @param {ChanRequest} chanReq
 * @returns {boolean}
 */
export function isValidChanRequest(chanReq: ChanRequest): boolean {
  return isValidChanMessage(chanReq)
}

/**
 * Function to check a response
 * @param {ChanResponse} chanRsp
 * @returns {boolean}
 */
export function isValidChanResponse(chanRsp: ChanResponse): boolean {
  return isValidChanMessage(chanRsp) && (chanRsp.code === ChanResCode.Ok)
}

/**
 * Function to send an async message to a channel
 * @param eventSender the event used to send the message
 * @param args the information that is sent
 */
export function sendAsyncMessage(eventSender: IpcRenderer, args?: any) {
  eventSender.send(asyncChanId, args)
}

/**
 * Function to get an array of all supported channels
 * @returns {Array<ChanDesc>}
 */
export function getIPCChanDescs(chanMap: { [id: string]: any }): { [id: string]: HandlerFunction } {
  // Build the list of IPC channels
  const channels = Object.keys(chanMap)
    .map(key => chanMap[key])

  let channelsArr: Array<ChanDesc> = []
  for (const elem of channels) {
    channelsArr = channelsArr.concat(Object.keys(elem)
      .map(key => elem[key])
      .filter(isValidChanDesc))
  }

  const channelsMap: { [id: string]: HandlerFunction } = {}

  for (const elem of channelsArr) {
    channelsMap[elem.id] = elem.chanHandler
  }

  return channelsMap
}

export type IPCEventEmitter = IpcMain | IpcRenderer

/**
 * Function to load request handlers
 * @param eventEmitter
 * @param {Array<ChanDesc>} channels
 */
export function loadRequestHandlers(eventEmitter: IPCEventEmitter,
                                    channels: { [id: string]: HandlerFunction }) {
  // listen to asynchronous channels
  eventEmitter.on(asyncChanId, async (event: any, args: any) => {
    // extract request from message
    const chanReq: ChanRequest = JSON.parse(args)

    // check request
    if (!isValidChanRequest(chanReq)) {
      return
    }

    // check if channel is supported
    if (chanReq.msgId in channels) {
      // Call handler to get message specific response
      const respMsg = await channels[chanReq.msgId](chanReq.msgContent)

      // Wrap message specific response into a generic protocol response
      const response = buildChanResponse(ChanResCode.Ok, chanReq.msgId, respMsg)

      // Send message back to sender
      sendAsyncMessage(event.sender, JSON.stringify(response))
    } else {
      // Wrap message specific response into a generic protocol response
      const response = buildChanResponse(ChanResCode.ErrNoHandler, chanReq.msgId, "")

      // Send message back to sender
      sendAsyncMessage(event.sender, JSON.stringify(response))
    }
  })
}

/**
 * Function to load response handlers
 * @param eventEmitter
 * @param {Array<ChanDesc>} channels
 */
export function loadResponseHandlers(eventEmitter: IPCEventEmitter,
                                     channels: { [id: string]: HandlerFunction }) {
  // listen to asynchronous channels
  eventEmitter.on(asyncChanId, async (event: any, args: any) => {
    // extract response from message
    const chanRsp: ChanResponse = JSON.parse(args)

    // check response
    if (!isValidChanResponse(chanRsp)) {
      return
    }

    // iterate over all valid channels
    if (chanRsp.msgId in channels) {
      // Call handler to get message specific response
      await channels[chanRsp.msgId](chanRsp.msgContent)
    }
  })
}