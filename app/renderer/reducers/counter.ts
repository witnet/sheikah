import { IAction } from "../actions/helpers"
import { increment, decrement } from "../actions/counter"

export type TState = number

const counter = (state = 0, action: IAction) => {
  if (increment.test(action)) {
    return state + 1
  } else if (decrement.test(action)) {
    return state - 1
  }

  return state
}
export default counter
