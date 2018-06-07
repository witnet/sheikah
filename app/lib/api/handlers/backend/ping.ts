import * as IPCCommon from "../../ipc/ipcCommon"

/**
 * Handler of ping message
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */

async function pingHandlerFunc(args: any): Promise<string> {
  return JSON.stringify({content: "sending pong"})
}

/**
 * Ping channel descriptor
 * @type {{id: string; chanHandler: (args: any) => Promise<string>}}
 */
const pingHandler: IPCCommon.ChanDesc = {
  id: "ping-msg",
  chanHandler: pingHandlerFunc
}

export default {pingHandler}
