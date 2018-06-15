/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */

/** Asynchronous communication channel */
export const IPC_ASYNC_CHAN_NAME = "async-msg"

/** Synchronous communication channel */
export const IPC_SYNC_CHAN_NAME = "sync-msg"

/**
 * Type representing a method handler function in an IPC call
 */
export type Handler = (args: string) => Promise<string>

/**
 * Enum representing a method type (sync/async)
 */
export enum MethodType {
  Async,
  Sync
}

/**
 * Method descriptor
 */
export type MethodDesc = {
  /** Method identifier */
  id: string;

  /** Method type */
  type: MethodType;

  /** Method's handler function for the reception of a message */
  handler: Handler;
}

/**
 * Function to get a map of all supported sync/async method descriptors
 *
 * Methods are loaded from directory following this structure:
 *  {
 *    AMethodDesc: { id: "a", handler: functionA },
 *    BMethodDesc: { id: "b", handler: functionB }
 *  }
 *
 * The desired output format is:
 * { "a": functionA, "b": functionB }
 *
 * @param {{[p: string]: any}} rawMethods
 * @param {MethodType} type
 * @returns {{[p: string]: Handler}}
 */
export function getMethodDescs(rawMethods: { [id: string]: any }, type: MethodType):
  { [id: string]: Handler } {

  // Get requested filter function
  const filterFunc = (type === MethodType.Sync) ? isValidSyncMethodDesc : isValidAsyncMethodDesc

  // Reduce map of maps to map
  const methods = Object
    .keys(rawMethods)
    .map(key => rawMethods[key])
    .filter(filterFunc)
    .reduce((acc: { [id: string]: Handler },
             desc: MethodDesc) => {
      return {...acc, [desc.id]: desc.handler}
    }, {})

  return methods
}

/**
 * Function to check if an object is a method descriptor
 * @param desc
 * @returns {boolean}
 */
export function isValidMethodDesc(desc: any): boolean {
  // check:
  // (1) if object
  // (2) if matches the MethodDesc interface
  return (typeof desc === "object") &&
    ("id" in desc) && ("type" in desc) && ("handler" in desc) &&
    (typeof desc.id === "string")  && (typeof desc.handler === "function")
}

/**
 * Function to check if an object is an async method descriptor
 * @param desc
 * @returns {boolean}
 */
function isValidAsyncMethodDesc(desc: any): boolean {
  // check:
  // (1) if method desc
  // (2) if type is async
  return isValidMethodDesc(desc) && (desc.type === MethodType.Async)
}

/**
 * Function to check if an object is a sync method descriptor
 * @param desc
 * @returns {boolean}
 */
function isValidSyncMethodDesc(desc: any): boolean {
  // check:
  // (1) if method desc
  // (2) if type is sync
  return isValidMethodDesc(desc) && (desc.type === MethodType.Sync)
}
