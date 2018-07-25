import { AesCipher, defaultAesCipherSettings } from "app/main/ciphers/aes"
import aesFixtures from "./aes.fixtures"

const encryptionSettings = { ...defaultAesCipherSettings, pbkdPassword: aesFixtures.pbkdPassword }

const AES = new AesCipher(encryptionSettings)

describe("Encryption", () => {
  it("should encrypt properly", async () => {
    const encrypted = await AES.encrypt(aesFixtures.plainText, aesFixtures.salt, aesFixtures.iv)
    expect(encrypted).toMatchObject(aesFixtures.cipherText)
  })

  it("should decrypt properly", async () => {
    const decrypted = await AES.decrypt(aesFixtures.cipherText)
    expect(decrypted).toMatchObject(aesFixtures.plainText)
  })

  it("should be totally symmetric", async () => {
    const anotherPlaintext = Buffer.from("another message")
    const encrypted = await AES.encrypt(anotherPlaintext)
    const decrypted = await AES.decrypt(encrypted)
    expect(decrypted).toMatchObject(anotherPlaintext)
  })
})