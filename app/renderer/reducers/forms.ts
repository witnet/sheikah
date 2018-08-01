import { AppForms, SoftLoginForm } from "app/renderer/store"
import * as Actions from "app/renderer/actions/actionNames"
import {
  FormsAction,
  SoftLoginAction,
} from "app/renderer/actions/actionTypes"

const defaultAppForms: AppForms = { softLogin: {} }

export const formsReducer = (forms = defaultAppForms, action: FormsAction): AppForms => {
  switch (action.type) {
    case Actions.UPDATE_SOFT_LOGIN:
      return { softLogin: softLoginReducer(forms.softLogin, action.payload) }
    default:
      return forms
  }
}

const softLoginReducer = (softLogin: SoftLoginForm, action: SoftLoginAction): SoftLoginForm => {
  switch (action.type) {
    case Actions.SET_FIELD:
      // Check if a partial of the soft login form was received
      if (typeof action.payload === "object") {
        return { ...softLogin, ...action.payload }
      }
      break
    case Actions.DELETE_FIELD:
      // Check if a key of the soft login form was received
      if (typeof action.payload === "string") {
        if (action.payload in softLogin) {
          // Create a copy of current softLogin state
          const newState = { ...softLogin }

          // Remove the key from the copy of the state
          delete newState[action.payload]

          // Return the new state
          return newState
        }
      }
      break
    default:
      return softLogin
  }

  return softLogin
}
