import { AesCipher, AesCipherSettings, defaultAesCipherSettings } from "app/main/ciphers/aes"
import { sha256StringHasher } from "app/main/hashers/sha256String"
import { InMemoryPersister } from "app/main/persisters/inMemory"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { Storage } from "app/main/storage"

const pbkdPassword = "password"
const aesSettings: AesCipherSettings = {
  ...defaultAesCipherSettings,
  pbkdPassword
}
const keyHasher = sha256StringHasher
const serializer = jsonBufferSerializer
const cipher = new AesCipher(aesSettings)
const backend = new InMemoryPersister()

const storage = new Storage(keyHasher, serializer, cipher, backend)

describe("jsonAesInMemory", () => {
  it("should put a string", async () => {
    await storage.put("foo", "bar")
  })

  it("should put a number", async () => {
    await storage.put("fee", 1234)
  })

  it("should put an object", async () => {
    await storage.put("faa", { beer: "cold" })
  })

  it("should get a string", async () => {
    const res = await storage.get("foo")
    expect(res).toEqual("bar")
  })

  it("should get a number", async () => {
    const res = await storage.get("fee")
    expect(res).toEqual(1234)
  })

  it("should get an object", async () => {
    const res = await storage.get("faa")
    expect(res).toEqual({ beer: "cold" })
  })
})
