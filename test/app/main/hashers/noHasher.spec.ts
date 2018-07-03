import { noHasher } from "app/main/hashers/no"
import fixtures from "./sha256.fixtures"

describe("NoHasher", () => {
  fixtures.pairs.forEach(([data], index) => {
    it(`should pass input data #${index} through`, async () => {
      const digest = await noHasher(data)
      expect(digest).toEqual(data)
    })
  })
})