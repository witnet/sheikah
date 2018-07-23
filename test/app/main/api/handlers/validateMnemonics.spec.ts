import * as crypto from "crypto"
import { validateMnemonics } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"

describe("validateMnemonics Handler", () => {
  const system = {
    appStateManager: new AppStateManager({
      unconsolidatedWallet: {
        mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
      }
    })
  }

  it("should reject malformed requests", async () => {
    const params = "invalid request"
    const result = await validateMnemonics(system, params).catch((e) => e)

    expect(JSON.stringify(result)).toMatch("Got a non-compliant")
  })

  it("should reject invalid mnemonics", async () => {
    const params = {
      mnemonics: "foo bar baz"
    }
    const result = await validateMnemonics(system, params)

    expect(result).toEqual({ tag: "invalid" })
  })

  it("should reject valid mnemonics not matching unconsolidated wallet", async () => {
    const params = {
      mnemonics: "control enroll cancel obey join cup vault jazz brush pledge raven huge"
    }
    const result = await validateMnemonics(system, params)

    expect(result).toEqual({ tag: "matcherr" })
  })

  it("should return generate a wallet id if mnemonics is fine", async () => {
    const params = {
      mnemonics: "fence recall half science actual limit wise pupil fish history cement oak"
    }
    const hash = crypto.pbkdf2Sync(params.mnemonics, "sheikah mnemonics", 4096, 32, "sha256")
    const id = hash.toString("hex")
    const result = await validateMnemonics(system, params)

    expect(result).toEqual({ tag: "id", id })
    expect(system.appStateManager.state.unconsolidatedWallet).toMatchObject({
      id
    })
  })

})
