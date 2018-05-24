import { Seed } from "app/lib/crypto/seed"
import * as _ from "lodash"

describe("seed", () => {
  it("should generate seed", () => {
    const seedFromMnemonics = Seed.deriveSeedFromMnemonics(
      "race pact attract approve vivid museum wear cube clown sing heavy sound"
    )
    const seedBuffer = Buffer.from([250, 112, 98, 135, 181, 177, 103, 219, 17,
      225, 90, 65, 243, 10, 151, 136, 201, 55, 134, 93, 27, 47, 77, 156, 107,
      164, 134, 255, 91, 63, 149, 111, 189, 212, 150, 184, 134, 105, 216, 246,
      241, 203, 63, 88, 185, 184, 146, 156, 61, 38, 114, 27, 151, 79, 22, 19,
      75, 252, 4, 159, 44, 2, 80, 131])
    const masterSecret = seedBuffer.slice(0, 32)
    const chainCode = seedBuffer.slice(32, 64)
    expect(_.isEqual(seedFromMnemonics, {masterSecret, chainCode})).toBeTruthy()
  })

})