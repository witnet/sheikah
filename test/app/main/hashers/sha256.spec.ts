import fixtures from "./sha256.fixtures"

describe("Sha256Hasher", () => {
  fixtures.pairs.forEach(([data, expected], index) => {
    it(`should be able to hash input data #${index}`, async () => {
      const digest = await fixtures.hasher(data)
      expect(digest).toEqual(Buffer.from(expected, "hex"))
    })
  })
})