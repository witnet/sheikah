import log from "app/common/logging"

/**
 * Void handler
 */
async function nop(system: any, params: Array<any>) {
  log.info(`[NOP Handler] Ignoring message: ${params.join(", ")}`)
}

export default nop
