import { actionCreatorVoid } from "./helpers"
import * as IPCFrontend from "../lib/api/ipc/ipcFrontend"

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
  return async (dispatch: Function) => {
    //build request
    const asyncRequest = IPCFrontend.buildChanRequest("ping-msg",
      JSON.stringify({ content: "sending ping" }))

    // send ping message and handle response
    IPCFrontend.sendAsyncRequest(asyncRequest)
      .then((response) => console.log("Backend responded", response))
      .catch((error) => {
        if (error.name === "TimeoutError") {
          console.error("Backend timed out", error)
        } else {
          console.error(error)
        }
      })

    dispatch(increment())
  }
}

const noResponse = () => {
  return (dispatch: Function) => {
    // build request
    const asyncRequest = IPCFrontend.buildChanRequest("no-resp-msg",
      JSON.stringify({ content: "sending no-response" }))

    // send ping message and handle response
    IPCFrontend.sendAsyncRequest(asyncRequest)
      .then((response) => console.log("Backend responded", response))
      .catch((error) => {
        if (error.name === "TimeoutError") {
          console.error("Backend timed out", error)
        } else {
          console.error(error)
        }
      })

    dispatch(increment())
  }
}

export { incrementIfOdd, incrementAsync, ping, noResponse }

// Handle async responses
IPCFrontend.handleAsyncResponses()