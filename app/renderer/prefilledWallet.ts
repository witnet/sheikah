import * as crypto from "crypto"
import {
  Wallet,
  Account,
  FinalKey,
  CURRENT_WALLET_VERSION
} from "app/common/runtimeTypes/storage/wallets"

export const prefilledWalletCaption = "" // TODO(anler): This needs to be defined

export const prefilledWallet = generatePrefilledWallet()

/**
 * Internal function that generates a pre-filled wallet. Do not use outside of this module.
 */
function generatePrefilledWallet(): Wallet {
  const chainCode = Buffer.from(
    [152, 8, 159, 246, 221, 27, 159, 171, 139, 98, 82, 232, 229, 140, 201, 2, 78, 113, 141, 104,
      187, 192, 191, 147, 91, 108, 192, 174, 214, 251, 100, 79])
  const masterSecret = Buffer.from(
    [196, 188, 49, 56, 180, 80, 166, 118, 177, 247, 66, 74, 173, 113, 48, 127, 194, 4, 164, 0,
      70, 14, 21, 211, 113, 209, 238, 121, 124, 251, 139, 168])

  const id = crypto.pbkdf2Sync(
    Buffer.concat([chainCode, masterSecret]),
    "sheikah seed", 4096, 32, "sha256"
  ).toString("hex")
  const _v = CURRENT_WALLET_VERSION
  const caption = "Demo wallet with example data"
  const epochs = {}

  const seedInfo = { seed: { chainCode, masterSecret }, kind: ("Wip3" as "Wip3") }

  const accounts = [generatePrefilledAccount()]

  return { id, _v, caption, seed: seedInfo, epochs, purpose: 0x80000003, accounts }
}

/**
 * Internal function that generates a pre-filled account. Do not use outside of this module.
 */
function generatePrefilledAccount(): Account {
  const balance = 4.24
  const keyPath = [2147483651, 2147488567, 2147483648]
  const keyChains = [
    {
      keyPath: [...keyPath, 0],
      finalKeys: [generateFinalKey(keyPath, 0)],
    },
    {
      keyPath: [...keyPath, 1],
      finalKeys: [generateFinalKey(keyPath, 1)],
    },
    {
      keyPath: [...keyPath, 2],
      finalKeys: [generateFinalKey(keyPath, 2)],
    }
  ]

  return { balance, keyPath, keyChains }
}

/**
 * Internal function that generates a pre-filled final key. Do not use outside of this module.
 */
function generateFinalKey(parentPath: Array<number>, index: number): FinalKey {
  const key = Buffer.from(
    [152, 8, 159, 246, 221, 27, 159, 171, 139, 98, 82, 232, 229, 140, 201, 2, 78, 113, 141, 104,
      187, 192, 191, 147, 91, 108, 192, 174, 214, 251, 100, 79])
  const chainCode = Buffer.from(
    [152, 8, 159, 246, 221, 27, 159, 171, 139, 98, 82, 232, 229, 140, 201, 2, 78, 113, 141, 104,
      187, 192, 191, 147, 91, 108, 192, 174, 214, 251, 100, 79])
  const extendedKey = { type: ("public" as "public"), key, chainCode }
  const keyPath = [...parentPath, index]
  const pkh = ""
  const value = 30
  const outpoint = { txid: "some tx id", index: 0 }
  const output = { type: ("P2PKH" as "P2PKH"), outpoint, value }
  const utxo = [output]
  const stxo = [{}]

  return { extendedKey, keyPath, pkh, utxo, stxo }
}
