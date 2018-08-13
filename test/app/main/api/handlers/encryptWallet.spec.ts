import { encryptWallet } from "app/main/api/handlers"
import { AppStateS, WalletStorageS, AppStorageS } from "app/main/system"
import { EncryptWalletSuccess } from "app/common/runtimeTypes/ipc/wallets"
import { asRuntimeType } from "app/common/runtimeTypes"
import * as fixture from "./encryptWalletFixtures"

describe("EncryptWallet Handler", () => {
  let system: AppStateS & WalletStorageS & AppStorageS
  beforeEach(() => {
    system = fixture.systemFactory()
  })

  it("should encrypt wallet", async () => {
    const result =
      asRuntimeType(await encryptWallet(system, fixture.walletParams), EncryptWalletSuccess)

    expect(result.wallet).toEqual(fixture.wallet)
  })

  it("should have removed the unconsolidated wallet", async () => {
    await encryptWallet(system, fixture.walletParams)
    expect(system.appStateManager.state.unconsolidatedWallet).toEqual({})
  })

  it("should have a wallet in memory", async () => {
    expect(system.walletStorage.storage).toBeUndefined()

    await encryptWallet(system, fixture.walletParams)
    expect(system.walletStorage.storage).toBeDefined()
  })

  it("should have a wallet in storage", async () => {
    await encryptWallet(system, fixture.walletParams)

    if (system.walletStorage.storage === undefined) {
      throw new Error("storage missing")
    }

    const storage = await system.walletStorage.storage.get("wallet")
    expect(storage).toBeDefined()
  })
})