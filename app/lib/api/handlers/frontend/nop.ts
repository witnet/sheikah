import * as IPCCommon from "../../ipc/ipcCommon"

/**
 * Handler of Example no response handler function
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */
async function noRespHandlerFunc(args: any): Promise<string> {
  console.log(args)

  return JSON.stringify({content: ""})
}

/**
 * No response channel descriptor
 * @type {{id: string; chanHandler: (args: any) => Promise<string>}}
 */
const noRespHandler: IPCCommon.ChanDesc = {
  id: "no-resp-msg",
  chanHandler: noRespHandlerFunc
}

export default {noRespHandler}
