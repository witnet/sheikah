import * as IPCMethods from "../../ipc/common/methods"

/**
 * Handler of no response handler function
 * @param data
 * @returns {Promise<string>}
 */
async function noRespHandlerFunc(data: any): Promise<string> {
  return JSON.stringify({content: ""})
}

/**
 * No response method descriptor
 * @type {{id: string; type: MethodType; handler: (data: any) => Promise<string>}}
 */
const noRespMethodDesc: IPCMethods.MethodDesc = {
  id: "no-resp-msg",
  type: IPCMethods.MethodType.Async,
  handler: noRespHandlerFunc
}

export default noRespMethodDesc
