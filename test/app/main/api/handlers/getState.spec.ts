import { asRuntimeType } from "app/common/runtimeTypes"
import { CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { getState } from "app/main/api/handlers"
import { AppState } from "app/common/runtimeTypes/ipc/state"
import { AppStateManager } from "app/main/appState"

describe("GetState Handler", () => {

  it("should return initial state when is no update", async () => {
    const system = {
      appStateManager: new AppStateManager()
    }

    // Call handler method to get appState from system
    const result = await getState(system, {})

    // Try to convert received value to a AppState runtime type
    const appState = asRuntimeType(result, AppState)

    // Check that there are no AppState (app state is empty)
    expect(appState).toMatchObject(system.appStateManager.state)
  })

  it("should return updated state when is update", async () => {
    const system = {
      appStateManager: new AppStateManager()
    }

    system.appStateManager.update({
      wallets: {
        _v: CURRENT_WALLETS_VERSION,
        infos: [
          { id: "w1", caption: "i1" },
          { id: "w2", caption: "i2" }
        ]
      }
    })

    // Call handler method to get AppState from system
    const result = await getState(system, {})

    // Try to convert received value to a AppState runtime type
    const appState = asRuntimeType(result, AppState)

    // Check that there are AppState (app state is not empty)
    expect(appState).toMatchObject(system.appStateManager.state)
  })
})
