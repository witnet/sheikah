/**
 * Generic app error factory
 * @param {string} name
 * @param {string} message
 * @returns {Error}
 */
export const appError = (name: string, message: string): Error => {
  const error = new Error(message)
  error.name = name

  return error
}