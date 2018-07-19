import { Seed } from "app/common/runtimeTypes/storage/wallets"
import { encodedSeed, seed, wrongEncodedSeed, wrongSeed } from "./seed.fixtures"

describe("Wallet runtime types encoding ", () => {
  it("should encode", () => {
    const encoded = Seed.encode(seed)
    expect(encoded).toEqual(encodedSeed)
  })

  it("should decode", () => {
    expect(Seed.decode(encodedSeed).getOrElseL(() => {
      throw new Error()
    })).toEqual(seed)
  })

  it("should fail encode", () => {
    expect(() => Seed.encode(wrongSeed)).toThrow()
  })

  it("should fail decode", () => {
    expect(Seed.decode(wrongEncodedSeed).isLeft).toBeTruthy()
  })
})