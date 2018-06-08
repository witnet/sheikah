import { actionCreatorVoid } from "./helpers"

const ipcRenderer = require("electron").ipcRenderer

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
      ipcRenderer.send("asynchronous-message", ["ping-message", "sending ping"])
      dispatch(increment())
  }
}

ipcRenderer.on("asynchronous-message",  (event: any, arg: any) => {
  console.log("in renderer process!")
  console.log(arg)
})

export { incrementIfOdd, incrementAsync, ping }
