import { actionCreatorVoid } from "./helpers"
import * as IPCCommon from "../lib/api/ipc/ipcCommon"
import * as IPCFrontend from "../lib/api/ipc/ipcFrontend"
import { ipcRenderer } from "electron"

export const increment = actionCreatorVoid("INCREMENT_COUNTER")
export const decrement = actionCreatorVoid("DECREMENT_COUNTER")

const incrementIfOdd = () => {
  return (dispatch: Function, getState: Function) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

const incrementAsync = (delay = 1000) => {
  return (dispatch: Function) => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}

const ping = () => {
  return (dispatch: Function) => {
    // build request
    const request = IPCCommon.buildChanRequest("ping-msg",
      JSON.stringify({ content: "sending ping" }))

    // send async message
    IPCCommon.sendAsyncMessage(ipcRenderer, JSON.stringify(request))

    dispatch(increment())
  }
}

const noResponse = () => {
  return (dispatch: Function) => {
    // build request
    const request = IPCCommon.buildChanRequest("no-resp-msg",
      JSON.stringify({ content: "sending no-response" }))

    // send async message
    IPCCommon.sendAsyncMessage(ipcRenderer, JSON.stringify(request))

    dispatch(increment())
  }
}

export { incrementIfOdd, incrementAsync, ping, noResponse }

// Load IPC channels
IPCFrontend.manageIPCChannels()
