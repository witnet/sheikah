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
    ipcRenderer.send("asynchronous-msg",
      ["ping-msg", {content: "sending ping"}])
    dispatch(increment())
  }
}

const noResponse = () => {
  return (dispatch: Function) => {
    ipcRenderer.send("asynchronous-msg",
      ["no-resp-msg", {content: "sending no-response"}])
    dispatch(increment())
  }
}
ipcRenderer.on("asynchronous-msg",  (event: any, arg: any) => {
  console.log(arg)
})

export { incrementIfOdd, incrementAsync, ping, noResponse }
