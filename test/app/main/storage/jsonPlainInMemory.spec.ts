import { jsonSerializer } from "app/common/serializers"
import { JsonSerializable } from "app/common/serializers/json"
import { PlainCipher } from "app/main/ciphers/plain"
import { noHasher } from "app/main/hashers/no"
import { InMemoryPersister } from "app/main/persisters/inMemory"
import { Storage } from "app/main/storage"

const keyHasher = noHasher
const serializer = {
  async serialize(value: JsonSerializable) {
    const str = await jsonSerializer.serialize(value)

    return Buffer.from(str)
  },
  async deserialize(value: Buffer) {
    const data = await jsonSerializer.deserialize(value.toString())

    return data
  }
}
const cipher = new PlainCipher<Buffer>()
const backend = new InMemoryPersister()

const storage = new Storage<string, JsonSerializable, Buffer, Buffer>(
  keyHasher, serializer, cipher, backend)

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
