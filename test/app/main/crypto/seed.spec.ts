import { seedData as fixture } from "./seedFixture"
import * as Seed from "app/main/crypto/seed"

describe("seed", () => {
  it("should generate seedData", () => {
    const seedBuffer = Buffer.from(fixture.seedBuffer)
    const masterSecret = seedBuffer.slice(0, 32)
    const chainCode = seedBuffer.slice(32, 64)

    expect(Seed.fromMnemonics(fixture.mnemonics))
      .toEqual({ masterSecret, chainCode })
  })

})
