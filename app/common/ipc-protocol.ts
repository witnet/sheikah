/**
 * This module contains all common types for messages sent between
 * backend and frontend IPC communication. It tries to abide as much
 * as possible to the JSON-RPC 2.0 Specification.
 */
import * as t from "io-ts"
import { PathReporter } from "io-ts/lib/PathReporter"
import { JsonSerializable } from "app/common/serializers"

/**
 * Json runtime type. This type is intended to replace `any` and hence make function signatures
 * more strict.
 */
const JsonRT = t.recursion<JsonSerializable>(
  "JsonRT",
  (self) => t.union([
    t.nullType,
    t.number,
    t.string,
    t.boolean,
    t.array(self),
    t.dictionary(t.string, self)
  ])
)

/** Version runtime type */
const Version = t.literal("2.0")

/** Version type */
type Version = t.TypeOf<typeof Version>

/** Json-RPC version literal */
export const jsonrpc = Version.value

/** Id runtime type */
export const Id = t.union([t.string, t.number, t.nullType])

/** Id type */
export type Id = t.TypeOf<typeof Id>

/** Params runtime type */
export const Params = JsonRT

/** Params type */
export type Params = t.TypeOf<typeof Params>

/** Request runtime type */
export const Request = t.intersection([
  t.type({
    jsonrpc: Version,
    method: t.string
  }),
  t.partial({
    id: Id,
    params: Params
  })
])

/** Request type */
export type Request = t.TypeOf<typeof Request>

/**
 * Check if the given request is a notification. A notification according to the json-rpc
 * spec is just a normal request that does not contain an id, meaning the server should not
 * bother in send a request.
 */
export function isNotification(req: Request): boolean {
  return !("id" in req)
}

/** Err runtime type */
export const Err = t.intersection([
  t.type({
    code: t.number,
    message: t.string
  }),
  t.partial({
    data: JsonRT
  })
])

export enum ErrCodes {
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603
}

/** Map of possible error codes and messages */
export const errors = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  parseError: { code: ErrCodes.ParseError, message: "Parse error" },
  /**
   * The JSON sent is not a valid Request object.
   */
  invalidRequest: { code: ErrCodes.InvalidRequest, message: "Invalid request" },
  /**
   * The method does not exist / is not available.
   */
  methodNotFound: { code: ErrCodes.MethodNotFound, message: "Method not found" },
  /**
   * Invalid method parameter(s).
   */
  invalidParams: { code: ErrCodes.InvalidParams, message: "Invalid params" },
  /**
   * Internal JSON-RPC error.
   */
  internalError: { code: ErrCodes.InternalError, message: "Internal JSON-RPC error" }
}

/** Err type */
export type Err = t.TypeOf<typeof Err>

/** Response runtime type */
export const Response = t.intersection([
  t.type({
    jsonrpc: Version,
    id: Id
  }),
  t.union([
    t.type({ error: Err }),
    t.type({ result: JsonRT })
  ])
])

/** Response type */
export type Response = t.TypeOf<typeof Response>

/**
 * Check if the given response is successful, that is, it contains a result field.
 */
export function isSuccessResponse(res: Response): boolean {
  return "result" in res
}

/**
 * Check if the given response is unsuccessful, that is, it contains an error field.
 */
export function isErrorResponse(res: Response): boolean {
  return "error" in res
}

/**
 * Factory function to build the name of a reply channel.
 */
export function replyChannel(id: Id): string {
  return `async-reply-chan-${id}`
}

/**
 * Factory function to build Request objects.
 */
export function request(method: string, id: Id, params?: Params): Request {
  return {
    jsonrpc,
    method,
    id,
    params
  }
}

/**
 * Factory function to build Notification objects (Requests without an id).
 */
export function notification(method: string, params?: Params): Request {
  return {
    jsonrpc,
    method,
    params
  }
}

/**
 * Factory function to build success Response objects.
 */
export function successResponse(result: JsonSerializable, id: Id): Response {
  return {
    jsonrpc,
    id,
    result
  }
}

/**
 * Factory function to build unsuccessful Response objects.
 */
export function errorResponse(error: Err, id: Id, data?: any): Response {
  return {
    jsonrpc,
    id,
    error: { data, ...error }
  }
}

/**
 * Decoding function that tries to convert an unsafe object coming from
 * a runtime boundary into a Request object.
 *
 * @param {any} request The unsafe object value.
 * @returns {Promise<Request>} A resolved promise with the request object
 * on success, or a rejected object with an array of error messages.
 */
export async function decodeRequest(request: any): Promise<Request> {
  const result = Request.decode(request)

  return result.getOrElseL(() => {
    const message = PathReporter.report(result).join("\n")
    throw new Error(message)
  })
}

/**
 * Encoding function that converts a Request object into a primitive object.
 *
 * @param {Request} request The request object value.
 * @returns {any} The primitive object value.
 */
export function encodeRequest(request: Request): any {
  return Request.encode(request)
}

/**
 * Decoding function that tries to convert an unsafe object coming from
 * a runtime boundary into a Response object.
 *
 * @param {any} response The unsafe object value.
 * @returns {Promise<Response>} A resolved promise with the response object
 * on success, or a rejected object with an array of error messages.
 */
export async function decodeResponse(response: any): Promise<Response> {
  const result = Response.decode(response)

  return result.getOrElseL(() => {
    const message = PathReporter.report(result).join("\n")
    throw new Error(message)
  })
}

/**
 * Encoding function that converts a Response object into a primitive object.
 *
 * @param {Response} response The response object value.
 * @returns {any} The primitive object value.
 */
export function encodeResponse(response: Response): any {
  return Response.encode(response)
}

/** Exception to be raised by handlers when params are not valid */
export class InvalidParamsError {
  /** name of error */
  public name: string
  /** message of error */
  public message: string
  constructor(message: string) {
    this.name = "InvalidParams"
    this.message = message
  }
}

/** Exception to be raised by clients after a timeout */
export class TimeoutError {
  /** name of error */
  public name: string
  /** message of error */
  public message: string
  constructor(message: string) {
    this.name = "TimeoutError"
    this.message = message
  }
}
