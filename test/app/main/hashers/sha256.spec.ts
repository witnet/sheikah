import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"
import { sha256StringHasher } from "app/main/hashers/sha256String"
import fixtures from "./sha256.fixtures"

describe("Sha256Hasher", () => {

  // Buffer mode
  fixtures.pairs.forEach(([data, expected], index) => {
    it(`should be able to hash input data #${index} as buffer`, async () => {
      const digest = await sha256BufferHasher(data)
      expect(digest).toEqual(Buffer.from(expected, "hex"))
    })
  })

  // String mode
  fixtures.pairs.forEach(([data, expected], index) => {
    it(`should be able to hash input data #${index} as string`, async () => {
      const digest = await sha256StringHasher(data)
      expect(digest).toEqual(expected)
    })
  })
})