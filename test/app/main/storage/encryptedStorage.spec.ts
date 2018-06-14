import * as Encryption from "appMain/storage/encryption"
import EncryptedStorage from "appMain/storage/encryptedStorage"
import MockedBackend from "appMain/storage/mockedBackend"

const mockedBackend = new MockedBackend()
const password = "password"
const encryptionSettings: Encryption.Settings = {
  ...Encryption.defaultSettings,
  password
}
const globalStorage = new EncryptedStorage(mockedBackend, encryptionSettings)

describe("EncryptedStorage", () => {
  it("should put a string", async () => {
    await globalStorage.put("foo", "bar")
  })

  it("should put a number", async () => {
    await globalStorage.put("fee", 1234)
  })

  it("should put an object", async () => {
    await globalStorage.put("faa", { beer: "cold" })
  })

  it("should get a string", async () => {
    const res = await globalStorage.get("foo")
    expect(res).toEqual("bar")
  })

  it("should get a number", async () => {
    const res = await globalStorage.get("fee")
    expect(res).toEqual(1234)
  })

  it("should get an object", async () => {
    const res = await globalStorage.get("faa")
    expect(res).toEqual({ beer: "cold" })
  })

  it("should be able to decrypt from a reconstructed vault",
    async () => {
      await globalStorage.close()
      const localStorage =
        new EncryptedStorage(mockedBackend, encryptionSettings)
      const res = await localStorage.get("foo")
      expect(res).toEqual("bar")
  })
})
