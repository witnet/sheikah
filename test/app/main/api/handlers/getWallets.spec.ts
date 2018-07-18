import { asRuntimeType } from "app/common/runtimeTypes"
import { getWallets } from "app/main/api/handlers"
import { Wallets } from "app/common/runtimeTypes/storage/wallets"
import { emptyAppState } from "app/main/appState"
import { AppState } from "app/common/runtimeTypes/ipc/state"

describe("GetWallets Handler", () => {

  it("should return no wallets when an empty state", async () => {
    const system = {
      appStateManager: {
        get state() { return emptyAppState }
      }
    }

    // Call handler method to get wallets from system
    const result = await getWallets(system, {})

    // Try to convert received value to a Wallets runtime type
    const wallets = asRuntimeType(result, Wallets)

    // Check that there are no wallets (app state is empty)
    expect(wallets).toMatchObject(system.appStateManager.state.wallets)
  })

  it("should return initialized wallets when non empty state", async () => {
    const nonEmptyAppState: AppState = {
      _seq: 0,
      wallets: [{id: "w1", caption: "i1"}, {id: "w2", caption: "i2"}]
    }

    const system = {
      appStateManager: {
        get state() { return nonEmptyAppState }
      }
    }

    // Call handler method to get wallets from system
    const result = await getWallets(system, {})

    // Try to convert received value to a Wallets runtime type
    const wallets = asRuntimeType(result, Wallets)

    // Check that there are no wallets (app state is empty)
    expect(wallets).toMatchObject(nonEmptyAppState.wallets)
  })
})
