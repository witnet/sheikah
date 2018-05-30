import {ipcMain} from "electron"
import {IChan, IChanResCode, IChanResponse} from "./ipcCommon"
import * as Handlers from "../handlers/exampleHandlers"

/**
 * Dictionary of all supported receiving channels by the back-end:
 * - Their related function handlers
 * - Their responses (optional)
 */
export const channels: { [id: string]: IChan } = {
  "ping-msg": { handler: Handlers.pingHandler, replyChanId: "pong-msg" },
  "no-resp-msg": { handler: Handlers.noRespHandler, replyChanId: "no-resp-msg" }
}

/**
 * Function to send an async message to a channel
 * @param event the event used to send the message
 * @param args the information that is sent
 */
export const sendAsyncMessage = (event: any, args: any) => {
  event.sender.send("asynchronous-msg", args)
}

/**
 * Function to load all asynchronous handlers
 */
export const loadAsyncHandlers = () => {
  ipcMain.on("asynchronous-msg", async (event: any, args: any) => {
    /** extract channel id */
    const [chanId, ...remaining] = args

    /** check if channel id belongs to a supported channel */
    if (chanId in channels) {
      const chan = channels[chanId]
      const respMsg = await chan.handler(remaining)
      const response: IChanResponse = {code: IChanResCode.Ok,
                                        id: 1, message: respMsg }
      sendAsyncMessage(event, [chan.replyChanId, JSON.stringify(response)])
    }
  })
}
