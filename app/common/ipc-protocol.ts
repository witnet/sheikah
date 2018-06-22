/**
 * This module contains all common types for messages sent between
 * backend and frontend IPC communication.
 */
import * as t from "io-ts"
import {PathReporter} from "io-ts/lib/PathReporter"

/**
 * Runtime type to represent a request in the IPC communication.
 */
export const Request = t.type({
  id: t.string,
  method: t.string,
  data: t.any
})

/**
 * Type to represent a request in the IPC communication.
 */
export type Request = t.TypeOf<typeof Request>

export const Metadata = t.Dictionary

export type Metadata = t.TypeOf<typeof Metadata>

/**
 * Runtime type to represent a response in the IPC communication.
 */
export const Response = t.intersection([
  t.type({
    status: t.union([t.literal("ok"), t.literal("error")]),
    data: t.any
  }),
  t.partial({
    meta: Metadata
  })
])

/**
 * Type to represent a response in the IPC communication.
 */
export type Response = t.TypeOf<typeof Response>

/**
 * Factory function to build channel requests.
 *
 * @param {string} id The id that identifies this request. This is
 * used in async communication for matching responses to requests.
 * @param {string} method The method name to invoke.
 * @param {any} data The data to pass to the method when being invoked.
 * @return {Request} The request object.
 */
  export function request(id: string, method: string, data: any): Request {
    return {
      id,
      method,
      data
    }
  }

/**
 * Factory function to build successful channel responses.
 *
 * @param {any} data The data of the response.
 * @param {Metadata} meta An optional map of metadata information.
 * @returns {Response} The response object.
 */
export function okResponse(data: any, meta?: Metadata): Response {
  return {
    status: "ok",
    meta,
    data
  }
}

/**
 * Factory function to build unsuccessful channel responses. This type
 * of response is used to signal errors in the dispatch mechanism of the
 * protocol itself. Business logic errors use a successful response but
 * communicate the error in the data field.
 *
 * @param {any} error The error object that will be used as
 * the data of the response.
 * @param {Metadata} meta An optional map of metadata information.
 * @returns {Response} The response object.
 */
export function errorResponse(error: any, meta?: Metadata): Response {
  return {
    status: "error",
    data: error,
    meta
  }
}

/**
 * Decoding function that tries to convert an unsafe request coming from
 * a runtime boundary into a safe one.
 *
 * @param {any} rawRequest The unsafe request value.
 * @returns {Promise<Request>} A resolved promise with the request object
 * on success, or a rejected object with an array of error messages.
 */
export async function decodeRequest(rawRequest: any): Promise<Request> {
  const result = Request.decode(rawRequest)

  return result.getOrElseL(() => {
    throw PathReporter.report(result)
  })
}

/**
 * Decoding function that tries to convert an unsafe response coming from
 * a runtime boundary into a safe one.
 *
 * @param {any} rawResponse The unsafe response value.
 * @returns {Promise<Response>} A resolved promise with the response object
 * on success, or a rejected object with an array of error messages.
 */
export async function decodeResponse(rawResponse: any): Promise<Response> {
  const result = Response.decode(rawResponse)

  return result.getOrElseL(() => {
    throw PathReporter.report(result)
  })
}
