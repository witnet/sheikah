/**
 * Error handler that always
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
async function error(system: any, params: any) {
  throw new Error("Error handler throwed this.")
}

export default error
