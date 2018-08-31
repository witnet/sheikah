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

export const assertNever = (_x: never) => undefined