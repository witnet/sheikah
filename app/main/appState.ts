import { AppState } from "app/common/runtimeTypes/ipc/state"
import { CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"

/**
 * An AppstateManager maintains app state and manages its access and update.
 */
export class AppStateManager {

  /**
   * The app state object itself.
   * @type {AppState}
   */
  private _state: AppState = emptyAppState

  constructor(initialState: Partial<AppState> = {}) {
    this.update(initialState)
  }

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
    const newSeq = (this._state._seq as number) + 1
    this._state = { ...this._state, ...updater, _seq: newSeq }

    return { ...updater, _seq: this._state._seq }
  }

}

export const emptyAppState: AppState = {
  _seq: 0,
  wallets: {
    _v: CURRENT_WALLETS_VERSION,
    infos: []
  }
}
