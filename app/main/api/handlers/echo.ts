import log from "app/common/logging"

/**
 * Echo handler
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
async function echo(system: any, params: any) {
  log.debug(`I got: ${JSON.stringify(params)}`)

  return params
}

export default echo
