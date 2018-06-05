import * as Seed from "app/lib/crypto/seed"
import * as _ from "lodash"

describe("seed", () => {
  it("should generate seed", () => {
    const seedFromMnemonics = Seed.deriveSeedFromMnemonics(
      "race pact attract approve vivid museum wear cube clown sing heavy sound"
    )
    const seedBuffer = Buffer.from([253, 212, 6, 199, 228, 105, 138, 96, 205, 64, 58, 21, 125, 87,
      24, 169, 248, 76, 224, 102, 117, 60, 13, 18, 16, 111, 125, 35, 14, 32, 103, 217, 132, 52, 79,
      252, 129, 156, 251, 90, 149, 141, 67, 195, 99, 113, 1, 224, 86, 107, 156, 221, 48, 157, 171,
      70, 221, 233, 234, 254, 72, 40, 18, 55]
    )
    const masterSecret = seedBuffer.slice(0, 32)
    const chainCode = seedBuffer.slice(32, 64)

    expect(_.isEqual(seedFromMnemonics, {masterSecret, chainCode})).toBeTruthy()
  })

})
