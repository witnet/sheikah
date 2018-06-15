/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */

/** Version of the protocol */
export const IPC_VERSION = 1

/**
 * Interface to represent a generic message in the IPC communication
 * (common fields for both requests and responses)
 */
export interface ChannelMsg {
  /** Version */
  version: number,

  /** Unique transaction id of the message (for handling retries logic) */
  id: number,

  /** Method id */
  method: string,
}

/**
 * Interface to represent a request in the IPC communication
 */
export interface ChannelReq extends ChannelMsg {
  /** Data (params, args) of the method (message specific, in JSON format) */
  data: string
}

/**
 * Interface to represent a successful response in the IPC communication
 */
export interface SuccessChannelRes extends ChannelMsg {
  /** Data (params, args) of the method (message specific, in JSON format) */
  data: string
}

/**
 * Interface to represent an error response in the IPC communication
 */
export interface ErrorChannelRes extends ChannelMsg {
  /** Error code */
  errorCode: ChannelErrCode,

  /** Error description */
  errorDesc: string
}

/** Type to represent a response in the IPC communication */
export type ChannelRes = SuccessChannelRes | ErrorChannelRes

/**
 * Enum type for error codes in the IPC communication
 */
export enum ChannelErrCode {
  ErrInvalidChannelReq,
  ErrUnknownMethod
}

/** Function to check if an object is a channel request */
export function isChannelReq(req: any): boolean {
  // check:
  // (1) if channel msg
  // (2) if matches the ChannelReq interface
  return isChannelMsg(req) && ("data" in req)
    && (typeof req.data === "string")
}

/** Function to check if an object is a channel response */
export function isChannelRes(res: any): boolean {
  return isSuccessChannelRes(res) || isErrorChannelRes(res)
}

/** Function to check if an object is a successful channel response */
export function isSuccessChannelRes(res: any): boolean {
  // check:
  // (1) if channel msg
  // (2) if matches the SuccessChannelRes interface
  return isChannelMsg(res) && ("data" in res)
    && (typeof res.data === "string")
}

/** Function to check if an object is an error channel response */
export function isErrorChannelRes(res: any): boolean {
  // check:
  // (1) if channel msg
  // (2) if matches the ErrorChannelRes interface
  return isChannelMsg(res) && ("errorCode" in res) && ("errorDesc" in res)
    && (typeof res.errorDesc === "string")
}

/** Function to check if an object is a channel message */
export function isChannelMsg(msg: any): boolean {
  // check:
  // (1) if object
  // (2) if matches the ChannelMsg interface
  return (typeof msg === "object") &&
    ("version" in msg) && ("id" in msg) && ("method" in msg) &&
    (typeof msg.version === "number")  && (typeof msg.id === "number") &&
    (typeof msg.method === "string")
}

/**
 * Function to check the validity of a request
 * @param {ChannelReq} req
 * @returns {boolean}
 */
export function isValidChannelReq(req: ChannelReq): boolean {
  return isValidChannelMsg(req)
}

/**
 * Function to check the validity of a response
 * @param {ChannelRes} res
 * @returns {boolean}
 */
export function isValidChannelRes(res: ChannelRes): boolean {
  return isValidChannelMsg(res)
}

/**
 * Function to check the validity of a message
 * @returns {boolean}
 * @param {ChannelMsg} msg
 */
export function isValidChannelMsg(msg: ChannelMsg): boolean {
  return (msg.version === IPC_VERSION)
}

/**
 * Function to build channel requests
 * @param {number} id
 * @param {string} method
 * @param {string} data
 * @returns {ChannelReq}
 */
export function buildChannelReq(id: number, method: string, data: string): ChannelReq {
  return {
    version: IPC_VERSION,
    id,
    method,
    data
  }
}

/**
 * Function to build successful channel response
 * @param {number} id
 * @param {string} method
 * @param {string} data
 * @returns {SuccessChannelRes}
 */
export function buildSuccessChannelRes(id: number, method: string,
                                       data: string): SuccessChannelRes {
  return {
    version: IPC_VERSION,
    id,
    method,
    data
  }
}

/**
 * Function to build error channel response
 * @param {number} id
 * @param {string} method
 * @param {ChannelErrCode} errorCode
 * @param {string} errorDesc
 * @returns {ErrorChannelRes}
 */
export function buildErrorChannelRes(id: number, method: string, errorCode: ChannelErrCode,
                                     errorDesc: string): ErrorChannelRes {
  return {
    version: IPC_VERSION,
    id,
    method,
    errorCode,
    errorDesc
  }
}