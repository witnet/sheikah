/**
 * Error handler that always
 */
async function error(system: any, params: any) {
  throw new Error("Error handler throwed this.")
}

export default error
