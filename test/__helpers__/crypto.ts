import { ExtendedKey } from "app/main/crypto/key/key"
import { fromEntropy } from "app/main/crypto/seed"
import * as PrivateKey from "app/main/crypto/key/privateKey"

/**
 * Helper for testing
 * @param {string} seedEntropy
 * @param {string} passPhrase
 * @returns {ExtendedKey<PrivateKey>}
 */
export function getMasterKey(seedEntropy: string, passPhrase = "Witnet seed"):
ExtendedKey<PrivateKey.PrivateKey> {
  const entropy = Buffer.from(seedEntropy, "hex")
  const { masterSecret, chainCode } = fromEntropy(entropy, passPhrase)
  const masterKey: ExtendedKey<PrivateKey.PrivateKey> =
    PrivateKey.extend(PrivateKey.fromBytes(masterSecret), chainCode)

  return masterKey
}
