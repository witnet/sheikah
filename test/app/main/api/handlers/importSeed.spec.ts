import { ImportSeedError } from "app/common/runtimeTypes/ipc/wallets"
import { importSeed } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"
import { AppStateS } from "app/main/system"
import * as crypto from "crypto"
import { fromMnemonics } from "app/main/crypto/seed"
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

  it("should reject valid mnemonics not matching unconsolidated wallet", async () => {
    const params = {
      kind: "mnemonics",
      mnemonics: "control enroll cancel obey join cup vault jazz brush pledge raven huge"
    }
    const result = await importSeed(system, params)

    expect(result).toMatchObject(error("MISMATCHING_MNEMONICS"))
  })

  it("should generate a wallet id if mnemonics is fine", async () => {
    const params = {
      kind: "mnemonics",
      mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
    }
    const { chainCode, masterSecret } = fromMnemonics(params.mnemonics)
    const result = await importSeed(system, params)
    const id = generateId(chainCode, masterSecret)
    expect(result).toMatchObject({ kind: "SUCCESS", id })
    expect(system.appStateManager.state.unconsolidatedWallet).toMatchObject({ id })
  })

  it("should generate a wallet from xprv", async () => {
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
    const id = generateId(seed.chainCode, seed.masterSecret)

    const result = await importSeed(system, params)

    expect(result).toMatchObject({ kind: "SUCCESS", id })
    expect(system.appStateManager.state.unconsolidatedWallet).toMatchObject({ id, seed })
  })
})

/** Generate ID for testing */
function generateId(chainCode: Buffer, masterSecret: Buffer): string {
  const hash = crypto.pbkdf2Sync(
    Buffer.concat([chainCode, masterSecret]),
    "sheikah mnemonics", 4096, 32, "sha256")

  return hash.toString("hex")
}