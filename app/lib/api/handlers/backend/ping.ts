import * as IPCMethods from "../../ipc/common/methods"

/**
 * Handler of ping method
 * @param data
 * @returns {Promise<string>}
 */
async function pingHandlerFunc(data: any): Promise<string> {
  return JSON.stringify({content: "sending pong"})
}

/**
 * Ping method descriptor
 * @type {{id: string; type: MethodType; handler: (data: any) => Promise<string>}}
 */
const pingMethodDesc: IPCMethods.MethodDesc = {
  id: "ping-msg",
  type: IPCMethods.MethodType.Async,
  handler: pingHandlerFunc
}

export default pingMethodDesc
