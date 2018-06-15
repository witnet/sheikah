import { pbkdf2 } from "appMain/crypto/pbkdf2"

/*
 All these test vectors come from RFC 6070:
 <https://tools.ietf.org/html/rfc6070>
 Expected results have been calculated using `python-pbkdf2`.
 */
describe("pbkdf2", () => {
  it("should pass RFC6070 test case #1", () => {
    const password = Buffer.from("password")
    const salt = Buffer.from("salt")
    const iterations = 1
    const length = 20
    const expected = Buffer
      .from("867f70cf1ade02cff3752599a3a53dc4af34c7a6", "hex")

    expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
  })

  it("should pass RFC6070 test case #2", () => {
    const password = Buffer.from("password")
    const salt = Buffer.from("salt")
    const iterations = 2
    const length = 20
    const expected = Buffer
      .from("e1d9c16aa681708a45f5c7c4e215ceb66e011a2e", "hex")

    expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
  })

  it("should pass RFC6070 test case #3", () => {
    const password = Buffer.from("password")
    const salt = Buffer.from("salt")
    const iterations = 4096
    const length = 20
    const expected = Buffer
      .from("d197b1b33db0143e018b12f3d1d1479e6cdebdcc", "hex")

    expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
  })

  it("should pass RFC6070 test case #5", () => {
    const password = Buffer.from("passwordPASSWORDpassword")
    const salt = Buffer.from("saltSALTsaltSALTsaltSALTsaltSALTsalt")
    const iterations = 4096
    const length = 25
    const expected = Buffer
      .from("8c0511f4c6e597c6ac6315d8f0362e225f3c501495ba23b868", "hex")

    expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
  })

  it("should pass RFC6070 test case #6", () => {
    const password = Buffer.from("pass\0word")
    const salt = Buffer.from("sa\0lt")
    const iterations = 4096
    const length = 16
    const expected = Buffer
      .from("9d9e9c4cd21fe4be24d5b8244c759665", "hex")

    expect(pbkdf2(password, salt, iterations, length)).toEqual(expected)
  })
})
