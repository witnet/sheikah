import { hash as fixture } from "./hashFixtures"
import { sha512hmac } from "app/main/crypto/hash"

describe("hmac 512", () => {
  it("should encrypt using hmacSha512", () => {
    const key = Buffer.from(fixture.keyHex, fixture.bufferEncoding)
    const data = Buffer.from(fixture.dataHex, fixture.bufferEncoding)
    const hash = sha512hmac(key, data)
    expect(hash.toString(fixture.bufferEncoding))
      .toEqual(fixture.validHash)
  })
})
