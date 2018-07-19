import log from "app/common/logging"

/**
 * Echo handler
 */
async function echo(system: any, params: any) {
  log.debug(`I got: ${JSON.stringify(params)}`)

  return params
}

export default echo
