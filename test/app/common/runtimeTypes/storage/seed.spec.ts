import { Seed } from "app/common/runtimeTypes/storage/wallets"
import { encodedSeed, seed, wrongEncodedSeed } from "./seed.fixtures"

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

  it("should fail decode", () => {
    expect(Seed.decode(wrongEncodedSeed).isLeft).toBeTruthy()
  })
})