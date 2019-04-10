import { jsonSerializer } from "app/common/serializers"
import { deadLetterChannel } from "app/common/ipc"
import * as protocol from "app/common/ipc-protocol"
import log from "app/common/logging"
import { Listener } from "app/main/ipc"
import { Event } from "app/main/synthetic"
import { matchRoute, Routes } from "./routes"

export { routes } from "./routes"

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers asynchronously.
 *
 * @param {T} system A system.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of
 * type Handler<T>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const asyncListenerFactory = genericListenerFactory(
  (responseChannel: string) => {
    return async (event: Event, response: string) => {
      event.sender.send(responseChannel, response)
    }
  }
)

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers synchronously.
 *
 * @param {T} system A system.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of type
 * Handler<T>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const syncListenerFactory = genericListenerFactory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (responseChannel: string) => {
    return async (event: Event, response: string) => {
      event.returnValue = response
    }
  }
)

type ResponseFunction = (responseChannel: string) => Listener

/**
 * Helper function that given a event-responding function generates an ipc-main listener
 * function that dispatches events to handlers and sends the response of those handlers
 * using the given event-responding function.
 *
 * @param {(event: Event, response: string) => void} f The event-responding function.
 * @returns {(system: T, routes: Routes<T>) => (event: Event, req: string) => void} The listener
 * factory function.
 */
function genericListenerFactory(sendResponseMessage: ResponseFunction) {
  return <T>(system: T, routes: Routes<T>): Listener => {
    return async (event: Event, message: string): Promise<void> => {
      let response

      try {
        // Step 1/4: Try to deserialize the message string into an object with the Json serializer
        log.debug(`[IPC Main] Received message: ${message}`)
        const obj = await jsonSerializer.deserialize(message)
        try {
          // Step 2/4: Validate if the deserialized object is a valid request
          const request = await protocol.decodeRequest(obj)
          try {
            // Step 3/4: Try to find a handler in `routes` for the method specified in
            // `request.method`
            const methodHandler = await matchRoute(routes, request.method)
            try {
              // Step 4/4: Invoke the method handler for `request.method` and try to invoke it
              // with `request.params`
              const params = request.params || null
              const result = await methodHandler(system, params)
              response = protocol.successResponse(
                result === undefined ? null : result,
                request.id || null
              )
            } catch (error) {
              // Step 4/4 (ERROR): If the invocation of the method handler fails with an
              // `InvalidParamsError` JSON-RPC says we must return an "invalid params" error
              // response. In case of any other error, it is treated as an unkown error and
              // JSON-RPC says we must return an "internal error" error response
              response = protocol.errorResponse(
                error instanceof protocol.InvalidParamsError
                  ? protocol.errors.invalidParams
                  : protocol.errors.internalError,
                request.id || null,
                { error, message }
              )
            }
          } catch (error) {
            // Step 3/4 (ERROR): If no handler is found JSON-RPC says we must return a
            // "method not found" error response
            response = protocol.errorResponse(
              protocol.errors.methodNotFound, request.id || null, { error, message })
          }
        } catch (error) {
          // Step 2/4 (ERROR): If the deserialized object is NOT a valid request JSON-RPC says we
          // must return an "invalid request" error response
          response = protocol.errorResponse(
            protocol.errors.invalidRequest, null, { error, message })
        }
      } catch (error) {
        // Step 1/4 (ERROR): If the deserialization fails JSON-RPC says we must return a
        // "parse error" error response
        response = protocol.errorResponse(protocol.errors.parseError, null, { error, message })
      }

      const responseObj = await protocol.encodeResponse(response)
      const responseMessage = await jsonSerializer.serialize(responseObj)

      log.debug(`[IPC Main] Created reponse message: ${responseMessage})`)

      const replyChannel = response.id ? protocol.replyChannel(response.id) : deadLetterChannel

      log.debug(`[IPC Main] Sending response message (${replyChannel})`)
      await sendResponseMessage(replyChannel)(event, responseMessage)
    }
  }
}

/**
 * Listener intended to be used only with dead letters channel. For every message it receives it
 * logs it as a warning.
 */
export async function deadLetterListener(event: Event, message: string): Promise<void> {
  log.warn(`[Dead Letter] Received message: ${message}`)
}
