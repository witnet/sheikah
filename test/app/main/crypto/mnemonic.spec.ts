import { generate, isValid } from "app/main/crypto/mnemonic"

describe("Bip39 mnemonic generation and validation", () => {
  it("should generate valid mnemonics", () => {
    expect(isValid(generate())).toBe(true)
  })

  it("should reject invalid mnemonics", () => {
    expect(isValid("foo bar")).toBe(false)
  })
})
