import {sha512hmac} from "../../../../app/lib/crypto/hash"

describe("hmac 512", () => {
  it("should encrypt using hmacSha512", () => {
    const key = Buffer.from("426974636F696E2073656564", "hex")
    const data = Buffer.from("000102030405060708090A0B0C0D0E0F", "hex")
    const hash = sha512hmac(key, data)
    expect(hash.toString("hex"))
      .toEqual("e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35873df" +
        "f81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508")
  })
}