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