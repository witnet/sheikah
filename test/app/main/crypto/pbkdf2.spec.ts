import {pbkdf2Data as fixtures} from "./pbkdf2Fixtures"
import {pbkdf2} from "../../../../app/main/crypto/pbkdf2"
/*
 All these test vectors come from RFC 6070:
 <https://tools.ietf.org/html/rfc6070>
 Expected results have been calculated using `python-pbkdf2`.
 */
describe("pbkdf2", () => {
  fixtures.valid.forEach((test, index) => {
    it(`should pass RFC6070 test case #${index}`, () => {
      const password = Buffer.from(test.password)
      const salt = Buffer.from(test.salt)
      const iterations = test.iterations
      const length = test.length
      const expected = Buffer.from(test.expected, fixtures.encoding)

      expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
    })
  })
})
