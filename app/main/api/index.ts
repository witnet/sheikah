/* tslint:disable:no-null-keyword */
import * as ipc from "app/common/ipc-protocol"
import { asyncChannel } from "app/common/ipc"
import { Listener } from "app/main/ipc"
import { Event } from "app/main/synthetic"
import { Json } from "app/main/system"
import { Routes, matchRoute } from "./routes"

export { routes } from "./routes"

type ListenerFactory<T> = (system: T, routes: Routes<T>) => Listener

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers asynchronously.
 *
 * @param {T} system A system containing at least a Json component in order to (de)serialize the
 * data received.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of
 * type Handler<T>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const asyncListenerFactory: ListenerFactory<Json> = genericListenerFactory(
  async (event, response) => {
    event.sender.send(asyncChannel, response)
  }
)

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers synchronously.
 *
 * @param {T} system A system containing at least a Json component in order
 * to (de)serialize the data received.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of type
 * Handler<T extends Json>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const syncListenerFactory: ListenerFactory<Json> = genericListenerFactory(
  async (event, response) => {
    event.returnValue = response
  }
)

/**
 * Helper function that given a event-responding function generates an ipc-main listener
 * function that dispatches events to handlers and sends the response of those handlers
 * using the given event-responding function.
 *
 * @param {(event: Event, response: string) => void} f The event-responding function.
 * @returns {(system: T, routes: Routes<T>) => (event: Event, req: string) => void} The listener
 * factory function.
 */
function genericListenerFactory(sendResponseMessage: Listener): ListenerFactory<Json> {
  return (system: Json, routes: Routes<Json>): Listener => {
    return async (event: Event, message: string): Promise<void> => {
      let response

      try {
        const obj = await system.json.decode(message)
        try {
          const request = await ipc.decodeRequest(obj)
          const id = request.id ? request.id : null
          try {
            const handler = await matchRoute(routes, request.method)
            try {
              const result = await handler(system, request.params)
              response = id ? ipc.successResponse(result, id) : undefined
            } catch (e) {
              response = ipc.errorResponse(
                e instanceof ipc.InvalidParamsError ?
                  ipc.errors.invalidParams :
                  ipc.errors.internalError,
                id,
                e
              )
            }
          } catch (e) {
            response = ipc.errorResponse(ipc.errors.methodNotFound, id, e)
          }
        } catch (e) {
          response = ipc.errorResponse(ipc.errors.invalidRequest, null, e)
        }
      } catch (e) {
        response = ipc.errorResponse(ipc.errors.parseError, null, e)
      }

      if (response) {
        const message = await ipc.encodeResponse(response)
        await sendResponseMessage(event, message)
      }
    }
  }
}
