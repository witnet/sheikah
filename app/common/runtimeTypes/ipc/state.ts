import { AppState } from "app/main/appState"
import * as t from "io-ts"

export const GetStateParams = t.type({ })
export type GetStateParams = t.TypeOf<typeof GetStateParams>

export const GetStateResponse = AppState
export type GetStateResponse = t.TypeOf<typeof GetStateResponse>