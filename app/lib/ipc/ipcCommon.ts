/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */

/**
 * Enum type for codes (ok/errors) in the IPC communication
 */
export enum IChanResCode {
  Ok,
  ErrNoHandler,
  ErrGeneric,
  ErrDbConnection
}

/**
 * Type representing a handler function in an IPC call
 */
export type THandlerFunction = (args: any) => Promise<string>

/**
 * Interface representing a message
 */
export interface IChanMessage {
  /** Id of the message */
  id: number,

  /** Content to the message */
  message: string
}

/**
 * Interface representing a request
 */
export interface IChanRequest extends IChanMessage {
}

/**
 * Interface representing a response (error code and serialized message)
 */
export interface IChanResponse extends IChanMessage {
  /** Response code */
  code: IChanResCode,
}

/**
 * Interface representing a channel
 */
export interface IChan {
  /** Channel handler */
  handler: THandlerFunction

  /** Channel id to send response to */
  replyChanId: string
}