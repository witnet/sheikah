import * as IPCCommon from "../../ipc/ipcCommon"

/**
 * Handler of Example no response handler function
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */
async function noRespHandlerFunc(args: any): Promise<string> {
  return JSON.stringify({content: ""})
}

/**
 * No response method descriptor
 * @type {{id: string; handler: (args: any) => Promise<string>}}
 */
const noRespHandler: IPCCommon.MethodDesc = {
  id: "no-resp-msg",
  handler: noRespHandlerFunc
}

export default {noRespHandler}
