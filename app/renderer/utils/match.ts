/**
 * Method that matches a value from an array of options
 *
 * @export
 * @template T
 * @param {T} value
 * @param {Array<{options: Array<T>, result: any}>} options
 * @returns
 */
export function match<T>(value: T, options: Array<{options: Array<T>, result: any}>) {
  const search = options.find(x => x.options.includes(value))
  return search
    ? search.result
    : undefined
}

export default match
