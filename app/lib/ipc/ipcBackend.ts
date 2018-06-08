import {ipcMain} from "electron"
import {IChan} from "./ipcCommon"
import * as Handlers from "../handlers/genericHandlers"
//import {pingHandler} from "../handlers/genericHandlers"

/**
 * Dictionary of all supported channels and their related function handlers
 */
export const channels: { [id: string]: IChan } = {
    "ping-message": { handler: Handlers.pingHandler,
                        replyChanId: "pong-message" },
    "zipi-message": { handler: Handlers.zipiHandler,
                        replyChanId: "zape-message" }
}

/**
 * Function to send a message to a channel as response to the
 * @param event
 * @param {string} msgId
 * @param msg
 */
export const sendMessageToChannel = (event: any, args: any) => {
  event.sender.send("asynchronous-message", args)
}

/**
 * Function to load all asynchronous handlers
 */
export const loadAsyncHandlers = () => {
    ipcMain.on("asynchronous-message", (event: any, args: any) => {
        console.log("in main process")
        console.log(args)
        const [chanId, ...remaining] = args
        const chan = channels[chanId]
        const result = chan.handler(event, remaining)
        sendMessageToChannel(event, [chan.replyChanId, result])
    })
}
