import * as t from "io-ts"
import { asRuntimeType } from "app/common/runtimeTypes"

type stringToNumber = { [key: string]: number }
type numberToString = { [key: number]: string }
type stringToString = { [key: string]: string }

/**
 * Swap keys for values
 * @param {numberToString} obj
 * @returns {stringToNumber}
 */
export function kvSwap(obj: numberToString): stringToNumber
export function kvSwap(obj: stringToNumber): numberToString
export function kvSwap(obj: stringToString): stringToString
export function kvSwap(obj: stringToNumber | numberToString | stringToString): any {
  return Object
    .entries(obj)
    .reduce((acc, [key, value]) => {
      return { ...acc, [value]: key }
    }, {})
}

/**
 * Add argument to a function keeping their types
 *
 * @export
 * @template T
 * @template U
 * @template V
 * @param {(arg: T, injected: V) => U} fn
 * @param {V} injected
 * @returns
 */
export function inject<T, U, V>(fn: (arg: T, injected: V) => U, injected: V) {
  return (arg: T): U => fn(arg, injected)
}

/**
 * Wrapper of asRuntimeType that replaces the thrown error with a custom error
 * @param input
 * @param runtimeType
 * @param error error to throw in case of failure
 */
export function asType<T, U, V>(input: t.mixed, runtimeType: t.Type<T, U>, error: V): T {
  try {
    return asRuntimeType(input, runtimeType)
  } catch {
    throw error
  }
}
/**
 * Converts a list of homogeneous functions into an asynchronous function that feeds a single input
 * argument to all the listed functions and returns a list with the matching outputs.
 * By "homogeneous" we mean that all the functions share the same contract: each of them accepts a
 * single input argument of type I and return a single value of type O.
 * TODO: with TS 3.x, we will be able to generalize fanOut() to accept non-homogeneous functions.
 * @param fns
 */
export function fanOut<I, O>(fns: Array<(arg: I) => O>) {
  return async (arg: I) => Promise.all(
    fns.map(async (fn) => Promise.resolve(arg).then(fn))
  )
}

/**
 * Picks a certain value by key from a map.
 * This is a very simple yet quite convenient helper when used in promise chains.
 * @param key
 */
export function pick<M, K extends keyof M>(key: K) {
  return (map: M) => map[key]
}
