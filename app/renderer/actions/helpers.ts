import { Action } from "redux"
import * as Actions from "./actionNames"

export interface ActionWithPayload<T extends keyof typeof Actions, P> extends Action {
  readonly type: T
  readonly payload?: P
}

interface IActionCreator<T extends keyof typeof Actions, P> {
  (payload: P): ActionWithPayload<T, P>

  test(action: Action): action is ActionWithPayload<T, P>
}

export const actionCreator = <P>(type: keyof typeof Actions): IActionCreator<typeof type, P> =>
  Object.assign((payload: P): ActionWithPayload<typeof type, P> => ({ type, payload }), {
    type,
    test(action: Action): action is ActionWithPayload<typeof type, P> {
      return action.type === type
    }
  })