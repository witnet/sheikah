import { AppInfo } from "app/common/runtimeTypes/storage/app"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import * as t from "io-ts"

/**
 * An AppstateManager maintains app state and manages its access and update.
 */
export class AppStateManager {

  /**
   * The app state object itself.
   * @type {AppState}
   */
  private _state: AppState = emptyAppState

  /**
   * Get a copy of the state object.
   */
  public get state(): AppState {
    return this._state
  }

  /**
   * Get the value associated with a certain key from state.
   * @param key
   */
  public get(key: keyof AppState): AppState[keyof AppState] {
    return this._state[key]
  }

  /**
   * Update the state according to an updater object ({ key: newValue })
   * @param updater
   */
  public update(updater: Partial<AppState>): Partial<AppState> {
    const newSeq = this._state._seq as number + 1
    this._state = { ...this._state, ...updater, _seq: newSeq }

    return {...updater, _seq: this._state._seq}
  }

}

export const emptyAppState: AppState = {
  _seq: 0,
  wallets: []
}

export const AppState = t.intersection([
  t.type({
    _seq: t.number,
    wallets: Wallets,
  }),
  t.partial({
    appInfo: AppInfo
  })
], "AppState")
export type AppState = t.TypeOf<typeof AppState>