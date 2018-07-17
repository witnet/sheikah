import { SubSystems } from "app/main/system"
import * as h from "./handlers"

export type Routes<T> = {
  [key: string]: h.Handler<T>
}

export const routes: Routes<SubSystems> = {
  getState: h.getState,
  getWallets: h.getWallets,
  ping: h.ping,
  nop: h.nop,
  echo: h.echo,
  error: h.error,
  newMnemonics: h.newMnemonics
}

/**
 * Function that given a map of method names to handler functions, and a method name, it returns
 * the matched handler function for that method.
 *
 * @param {Routes<T>} routes The map of method names to handler functions.
 * @param {string} method The name of the method used to find the corresponding handler in routes.
 * @returns {Promise<Handler<T>>} A promise that resolves with the handler function or rejects to
 * an error message if that method name has no corresponding handler.
 */
export async function matchRoute<T>(routes: Routes<T>, method: string): Promise<h.Handler<T>> {
  if (!(method in routes)) {
    throw new Error(`No handler associated to method/channel: ${method}`)
  }

  return routes[method]
}
