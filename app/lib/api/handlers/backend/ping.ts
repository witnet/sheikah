import * as IPCCommon from "../../ipc/ipcCommon"

/**
 * Handler of ping method
 * @returns {Promise<string>} message to be returned to the channel
 * @param params
 */
async function pingHandlerFunc(params: any): Promise<string> {
  return JSON.stringify({content: "sending pong"})
}

/**
 * Ping method descriptor
 * @type {{id: string; handler: (params: any) => Promise<string>}}
 */
const pingMethodDesc: IPCCommon.MethodDesc = {
  id: "ping-msg",
  handler: pingHandlerFunc
}

export default pingMethodDesc
