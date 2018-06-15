import { actionCreatorVoid } from "./helpers"

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

export { incrementIfOdd, incrementAsync }
