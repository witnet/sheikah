/**
 * Example ping handler function
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */
export async function pingHandler(args: any): Promise<string> {
  return JSON.stringify({content: "sending pong"})
}

/**
 * Example no response handler function
 * @param args received message from the channel
 * @returns {Promise<string>} message to be returned to the channel
 */
export async function noRespHandler(args: any): Promise<string> {
  return JSON.stringify({content: ""})
}
