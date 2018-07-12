import { InvalidParamsError } from "app/common/ipc-protocol"
import * as t from "io-ts"

export const enum Contexts {
  STORAGE = "storage",
  IPC = "ipc",
}

/**
 * Decode and validate a mixed JS object as a certain runtime type.
 * @param input
 * @param runtimeType
 * @param context
 */
export function asRuntimeType<T>(input: t.mixed, runtimeType: t.Type<T>, context?: Contexts): T {
  return runtimeType.decode(input).getOrElseL(() => {
    const ctx = context ? ` from ${context}` : ""
    const errorMessage = `Got a non-compliant ${runtimeType.name}${ctx}: ${JSON.stringify(input)}`
    throw new InvalidParamsError(errorMessage)
  })
}

/**
 * Encode a runtime-typed object into a mixed JS object
 * @param input
 * @param runtimeType
 */
export function asObject<T>(input: T, runtimeType: t.Type<T>): t.mixed {
  return runtimeType.encode(input)
}

export const Empty = {}
export type Empty = t.TypeOf<typeof Empty>