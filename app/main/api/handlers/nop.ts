import log from "app/common/logging"

/**
 * Void handler
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
async function nop(system: any, params: any) {
  log.info(`[NOP Handler] Ignoring message: ${params.join(", ")}`)
}

export default nop
