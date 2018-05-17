const assert = require("assert")
const crypto = require("crypto")

/**
 * PDKBF2
 * https://github.com/stayradiated/pbkdf2-sha512
 * @param {string | Buffer} key
 * @param {string | Buffer} salt
 * @param {number} iterations
 * @param {number} dkLen
 * @returns {Buffer}
 */
export const pbkdf2 = (key: string | Buffer, salt: string | Buffer,
                       iterations: number, dkLen: number) => {
  const hLen = 64 // SHA512 Mac lenght
  const validKeyLength = dkLen <= (Math.pow(2, 32) - 1) * hLen
  assert(validKeyLength, "requested key length too long")

  const saltBuffer = (typeof salt === "string") ? Buffer.from(salt) : salt
  const keyBuffer = (typeof key === "string") ? Buffer.from(key) : key

  const DK = Buffer.alloc(dkLen)
  const T = Buffer.alloc(hLen)

  const block1 = Buffer.alloc(saltBuffer.length + 4)

  const l = Math.ceil(dkLen / hLen)
  const r = dkLen - (l - 1) * hLen

  saltBuffer.copy(block1, 0, 0, saltBuffer.length)
  for (let i = 1; i <= l; i++) {
    block1[saltBuffer.length + 0] = (i >> 24 & 0xFF)
    block1[saltBuffer.length + 1] = (i >> 16 & 0xFF)
    block1[saltBuffer.length + 2] = (i >> 8 & 0xFF)
    block1[saltBuffer.length + 3] = (i >> 0 & 0xFF)

    let U = crypto.createHmac("sha512", keyBuffer)
      .update(block1)
      .digest()

    U.copy(T, 0, 0, hLen)

    for (let j = 1; j < iterations; j++) {
      U = crypto.createHmac("sha512", keyBuffer)
        .update(U)
        .digest()

      for (let k = 0; k < hLen; k++) {
        T[k] ^= U[k]
      }
    }

    const destPos = (i - 1) * hLen
    const len = (i === l ? r : hLen)
    T.copy(DK, destPos, 0, len)
  }

  return DK
}