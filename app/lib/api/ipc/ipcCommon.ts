/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */

/** Version of the protocol */
export const IPC_VERSION = 1

/** Asynchronous communication channel */
export const IPC_ASYNC_CHAN_NAME = "async-msg"

/** Synchronous communication channel */
export const IPC_SYNC_CHAN_NAME = "sync-msg"

/**
 * Type representing a method handler function in an IPC call
 */
export type HandlerFunction = (args: string) => Promise<string>

/**
 * Method description
 */
export type MethodDesc = {
  /** Method identifier */
  id: string;

  /** Method's handler function for the reception of a message */
  handler: HandlerFunction;
}

/**
 * Function to check the type of imported methods (they should match MethodDesc
 * interface)
 * @param elem
 * @returns {boolean}
 */
export function isValidMethodDesc(elem: any): boolean {
  // check:
  // (1) if object
  // (2) if matches the MethodDesc interface (id: string, handler: function)
  return (typeof elem === "object") &&
    ("id" in elem) && ("handler" in elem) &&
    (typeof elem.id === "string")  && (typeof elem.handler === "function")
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

  /** Method id */
  method: string,

  /** Params of the method (message specific, in JSON format) */
  params: string
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
  ErrUnknownMethod
}

/**
 * Function to check the header in the communication protocol
 * @returns {boolean}
 * @param chanMsg
 */
export function isValidChanMessage(chanMsg: ChanMessage): boolean {
  return (chanMsg.version === IPC_VERSION)
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
 * Function to get a map of all supported method descriptors
 * @param {{[p: string]: any}} methodsMap
 * @returns {{[p: string]: HandlerFunction}}
 */
export function getIPCMethodDescs(methodsMap: { [id: string]: any }):
  { [id: string]: HandlerFunction } {
  // methods are imported following this structure:
  //  { AMethodDesc: { id: "a", handler: functionA },
  //    BMethodDesc: { id: "b", handler: functionB }
  //  }
  // the desired output format is:
  //  { "a": functionA, "b": functionB }
  const reducedMethodMap = Object
    .keys(methodsMap)
    .map(key => methodsMap[key])
    .filter(isValidMethodDesc)
    .reduce((acc: { [id: string]: HandlerFunction },
             desc: MethodDesc) => {
      return {...acc, [desc.id]: desc.handler}
    }, {})

  return reducedMethodMap
}