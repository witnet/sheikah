import { JsonSerializable } from "app/common/serializers/json"
import { PlainCipher } from "app/main/ciphers/plain"
import { InMemoryPersister } from "app/main/persisters/inMemory"
import { Storage } from "app/main/storage"
import { jsonBufferSerializer } from "app/main/serializers/jsonBuffer"
import { sha256BufferHasher } from "app/main/hashers/sha256Buffer"

const keyHasher = sha256BufferHasher
const serializer = jsonBufferSerializer
const cipher = new PlainCipher<Buffer>()
const persister = new InMemoryPersister()

const storage = new Storage<Buffer, JsonSerializable, Buffer, Buffer>(
  keyHasher, serializer, cipher, persister)

describe("jsonPlainInMemory", () => {
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
