import { ImportSeedError } from "app/common/runtimeTypes/ipc/wallets"
import { importSeed } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"
import { AppStateS } from "app/main/system"
import * as Slip32 from "slip32"

/**
 * Common factory for any of the mnemonics validation errors.
 * This is 100% equivalent to `buildErrorResponse` in "app/common/runtimeTypes/ipc/wallets", but we
 * are not using that because it belongs to the internal data flow of the `importSeed`
 * handler—if `buildErrorResponse` failed, all these tests would fail too.
 * @param error
 */
function error(error: ImportSeedError["error"]): ImportSeedError {
  return { kind: "ERROR", error }
}

/**
 * Subsystems mock factory.
 * This function returns a system-like data structure with a pre-filled unconsolidated wallet.
 */
function systemFactory() {
  return {
    appStateManager: new AppStateManager({
      unconsolidatedWallet: {
        mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
      }
    })
  }
}

describe("importSeed Handler", () => {
  let system: AppStateS

  beforeEach(() => {
    system = systemFactory()
  })

  it("should reject malformed requests", async () => {
    const params = "invalid request"
    const result = await importSeed(system, params)

    expect(result).toMatchObject(error("INVALID_METHOD_PARAMS"))
  })

  it("should reject invalid mnemonics", async () => {
    const params = {
      kind: "mnemonics",
      mnemonics: "foo bar baz"
    }
    const result = await importSeed(system, params)

    expect(result).toMatchObject(error("INVALID_MNEMONICS"))
  })

  it("should accept valid mnemonics not matching unconsolidated wallet", async () => {
    const params = {
      kind: "mnemonics",
      mnemonics: "control enroll cancel obey join cup vault jazz brush pledge raven huge"
    }
    const result = await importSeed(system, params)

    expect(result).toMatchObject({ kind: "SUCCESS" })
  })

  it("should import seed if mnemonics are fine", async () => {
    const params = {
      kind: "mnemonics",
      mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
    }
    const result = await importSeed(system, params)
    expect(result).toMatchObject({ kind: "SUCCESS" })
  })

  it("should import seed from xprv", async () => {
    const params = {
      kind: "xprv",
      xprv: "xprv1qxqqqqqq78qr7hlewyyfzt74vasa87k63pu7g9e6hfzlzrdyh0v5k8zfw9sqpsyv7vcejeyz" +
        "cpkm85jel7vmujlhpquzf4f3sh3nry0w0n4jh7t0jhc039"
    }

    const { extendedKey } = Slip32.importKeyFromSlip32(params.xprv)
    const seed = {
      chainCode: Buffer.from(extendedKey.chainCode),
      masterSecret: Buffer.from(extendedKey.key.bytes)
    }

    const result = await importSeed(system, params)

    expect(result).toMatchObject({ kind: "SUCCESS" })
    expect(system.appStateManager.state.unconsolidatedWallet).toMatchObject({ seed })
  })
})
