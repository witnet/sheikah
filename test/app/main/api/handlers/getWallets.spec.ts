import { asRuntimeType } from "app/common/runtimeTypes"
import { getWalletInfos } from "app/main/api/handlers"
import { WalletInfos, CURRENT_WALLETS_VERSION } from "app/common/runtimeTypes/storage/wallets"
import { AppStateManager } from "app/main/appState"

describe("GetWallets Handler", () => {
  it("should return no wallets when an empty state", async () => {
    const system = {
      appStateManager: new AppStateManager(),
    }

    // Call handler method to get wallets from system
    const result = await getWalletInfos(system, {})

    // Try to convert received value to a Wallets runtime type
    const wallets = asRuntimeType(result, WalletInfos)

    // Check that there are no wallets (app state is empty)
    expect(wallets).toMatchObject(system.appStateManager.state.walletInfos)
  })

  it("should return initialized wallets when non empty state", async () => {
    const system = {
      appStateManager: new AppStateManager(),
    }

    system.appStateManager.update({
      walletInfos: {
        _v: CURRENT_WALLETS_VERSION,
        infos: [
          { id: "w1", caption: "i1" },
          { id: "w2", caption: "i2" },
        ],
      },
    })

    // Call handler method to get wallets from system
    const result = await getWalletInfos(system, {})

    // Try to convert received value to a Wallets runtime type
    const wallets = asRuntimeType(result, WalletInfos)

    // Check that there are no wallets (app state is empty)
    expect(wallets).toMatchObject(system.appStateManager.state.walletInfos)
  })
})
