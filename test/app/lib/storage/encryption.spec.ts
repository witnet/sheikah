import * as Encryption from "app/lib/storage/encryption"

const password = "password"
const encryptionSettings = {...Encryption.defaultSettings, password}
const iv = Buffer.from([228, 32, 76, 12, 102, 95, 16, 135, 8, 220, 202, 223,
  245, 11, 175, 113])
const salt = Buffer.from([219, 250, 64, 13, 215, 27, 147, 17, 228, 160, 75, 127,
  137, 111, 36, 253, 178, 27, 156, 209, 252, 141, 79, 224, 56, 13, 46, 165, 27,
  202, 76, 104])

const plaintext = Buffer.from("message")
const ciphertext = Buffer.from([0, 0, 0, 16, 228, 32, 76, 12, 102, 95, 16, 135,
  8, 220, 202, 223, 245, 11, 175, 113, 0, 0, 0, 16, 203, 1, 7, 131, 158, 165,
  173, 189, 65, 4, 224, 183, 65, 140, 25, 38, 0, 0, 0, 32, 219, 250, 64, 13,
  215, 27, 147, 17, 228, 160, 75, 127, 137, 111, 36, 253, 178, 27, 156, 209,
  252, 141, 79, 224, 56, 13, 46, 165, 27, 202, 76, 104])

describe("Encryption", () => {
  it("should encrypt properly", () => {
    const encrypted = Encryption.encrypt(
      plaintext,
      encryptionSettings,
      iv,
      salt
    )
    expect(encrypted).toMatchObject(ciphertext)
  })

  it("should encrypt properly", () => {
    const decrypted = Encryption.decrypt(ciphertext, encryptionSettings)
    expect(decrypted).toMatchObject(plaintext)
  })

  it("should be totally symmetric", () => {
    const anotherPlaintext = Buffer.from("another message")
    const encrypted = Encryption.encrypt(
      anotherPlaintext,
      encryptionSettings,
      iv,
      salt
    )
    const decrypted = Encryption.decrypt(encrypted, encryptionSettings)
    expect(decrypted).toMatchObject(anotherPlaintext)
  })
})