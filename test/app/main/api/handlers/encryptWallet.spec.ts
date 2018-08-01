import { encryptWallet } from "app/main/api/handlers"
import { AppStateS, WalletStorageS } from "app/main/system"
import { EncryptWalletSuccess } from "app/common/runtimeTypes/ipc/wallets"
import { asRuntimeType } from "app/common/runtimeTypes"
import * as fixture from "./encryptWalletFixtures"

describe("EncryptWallet Handler", () => {
  let system:  AppStateS & WalletStorageS
  beforeEach(() => {
    system = fixture.systemFactory()
  })

  it("should encrypt wallet", async () => {
    const result =
      asRuntimeType(await encryptWallet(system, fixture.walletParams), EncryptWalletSuccess)

    expect(result.wallet).toEqual(fixture.wallet)
  })

  it("should fail on non matching ID", async () => {
    const params = {
      ...fixture.walletParams,
      id: "45"
    }
    const result = await encryptWallet(system, params)

    expect(result).toEqual(fixture.buildError("INVALID_WALLET_ID"))
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
})

describe("EncryptWallet mnemonic", () => {
  it("should fail on invalid mnemonics", async () => {
    const system = fixture.systemFactory("hey there")
    const result = await encryptWallet(system, fixture.walletParams)

    expect(result).toEqual(fixture.buildError("INVALID_MNEMONICS"))
  })
})