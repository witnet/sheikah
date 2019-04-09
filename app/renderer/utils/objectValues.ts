
/**
 * Get the values of an object without ES2017 polyfil
 *
 * @param {Object} object
 * @returns [any] Array<any>
 */
export function objectValues(object: Record<string, any>) {
  return Object.keys(object).map(key => object[key])
}

export default objectValues
