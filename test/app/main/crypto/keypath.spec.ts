import * as KeyPath from "app/main/crypto/keyPath"
import * as fixtures from "./keyPathFixtures"

describe("key path", () => {
  fixtures.pathsToString.valid.forEach(test => {
      it(`should parse derivation path "${test.expected}"`, () => {
        expect(KeyPath.fromString(test.path)).toMatchObject(test.expected)
      })
    }
  )
  fixtures.pathsToString.invalid.forEach(test => {
      it(`shouldn't parse derivation path "${test.path}"`, () => {
        expect(() => KeyPath.fromString(test.path)).toThrow()
      })
    }
  )
  fixtures.stringFromPath.valid.forEach(test => {
      it(`should parse "${test.expected}" from derivation path`, () => {
        expect(KeyPath.toString(test.path)).toBe(test.expected)
      })
    }
  )
})
