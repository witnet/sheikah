/**
 * Function that returns a promise that is resolved after
 * the specified delay (in ms)
 * @param ms
 */
export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
