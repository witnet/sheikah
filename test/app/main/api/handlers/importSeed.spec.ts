import { ImportSeedError } from "app/common/runtimeTypes/ipc/wallets"
import { validateMnemonics } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"
import { AppStateS } from "app/main/system"
import * as crypto from "crypto"

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
    const result = await validateMnemonics(system, params)

    expect(result).toMatchObject(error("INVALID_METHOD_PARAMS"))
  })

  it("should reject invalid mnemonics", async () => {
    const params = {
      mnemonics: "foo bar baz"
    }
    const result = await validateMnemonics(system, params)

    expect(result).toMatchObject(error("INVALID_MNEMONICS"))
  })

  it("should reject valid mnemonics not matching unconsolidated wallet", async () => {
    const params = {
      mnemonics: "control enroll cancel obey join cup vault jazz brush pledge raven huge"
    }
    const result = await validateMnemonics(system, params)

    expect(result).toMatchObject(error("MISMATCHING_MNEMONICS"))
  })

  it("should generate a wallet id if mnemonics is fine", async () => {
    const params = {
      mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
    }
    const hash = crypto.pbkdf2Sync(params.mnemonics, "sheikah mnemonics", 4096, 32, "sha256")
    const id = hash.toString("hex")
    const result = await validateMnemonics(system, params)

    expect(result).toMatchObject({ kind: "SUCCESS", id })
    expect(system.appStateManager.state.unconsolidatedWallet).toMatchObject({ id })
  })

})
