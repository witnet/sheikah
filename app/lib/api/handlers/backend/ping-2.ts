import * as IPCCommon from "../../ipc/ipcCommon"

/**
 * Handler of ping message
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */

async function ping2HandlerFunc(args: any): Promise<string> {
  return JSON.stringify({content: "sending ping2"})
}

/**
 * Ping channel descriptor
 * @type {{id: string; chanHandler: (args: any) => Promise<string>}}
 */
const ping2Handler: IPCCommon.ChanDesc = {
  id: "ping-msg",
  chanHandler: ping2HandlerFunc
}

export default {ping2Handler}
