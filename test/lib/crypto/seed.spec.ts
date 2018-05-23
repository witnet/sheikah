import { Seed } from "../../../app/lib/crypto/seed"
import * as _ from "lodash"

describe("seed", () => {
  it("should generate seed", () => {
    const seedFromMnemonics = Seed.deriveSeedFromMnemonics(
      "race pact attract approve vivid museum wear cube clown sing heavy sound"
    )
    const seed = Buffer.from([
      253, 151, 5, 168, 138, 120, 19, 136, 35, 36, 8, 58, 79, 4, 69, 233, 64,
      22, 110, 34, 49, 108, 123, 233, 77, 243, 150, 105, 121, 71, 100, 42, 45,
      140, 129, 221, 86, 228, 188, 240, 52, 148, 161, 209, 70, 158, 232, 226,
      207, 167, 183, 254, 111, 29, 3, 248, 77, 156, 126, 62, 251, 13, 68, 110
    ])
    expect(_.isEqual(seed, seedFromMnemonics)).toBeTruthy()
  })

})