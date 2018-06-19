import * as ipc from "app/common/ipc-protocol"
import { Event } from "app/main/synthetic"
import { JsonC } from "app/main/system"
import { Routes, matchRoute } from "./routes"

export { routes } from "./routes"

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers asynchronously.
 *
 * @param {T} system A system containing at least a JsonC component in order to (de)serialize the
 * data received.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of
 * type Handler<T>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const asyncListenerFactory = genericListenerFactory(
  (event, response) => {
    event.sender.send(response)
  }
)

/**
 * Factory function that given a system and routes returns an ipc-main listener that dispatches
 * events to handlers and sends the response of those handlers synchronously.
 *
 * @param {T} system A system containing at least a JsonC component in order
 * to (de)serialize the data received.
 * @param {Routes<T>} routes A map of routes that pairs method names to handler functions of type
 * Handler<T extends JsonC>.
 * @returns {(event: Event, req: string) => void} The listener function
 */
export const syncListenerFactory = genericListenerFactory(
  (event, response) => {
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
function genericListenerFactory(f: (event: Event, response: string) => void) {
  return (system: JsonC, routes: Routes<JsonC>) => {
    return async (event: Event, rawRequest: string) => {
      let response
      const json = system.json

      try {
        const rawRequestObject = await json.decode(rawRequest)
        const request = await ipc.decodeRequest(rawRequestObject)
        const { method, id } = request
        const meta = { id, method }
        const handler = await matchRoute(routes, method)
        const result = await handler(system, request.data)
        response = ipc.okResponse(result, meta)
      } catch (e) {
        response = ipc.errorResponse(e, { request: rawRequest })
      }
      const responseEncoded = await json.encode(response)

      f(event, responseEncoded)
    }
  }
}
