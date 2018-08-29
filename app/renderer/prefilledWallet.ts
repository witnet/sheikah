import * as crypto from "crypto"
import {
  Wallet,
  Account,
  FinalKey,
  CURRENT_WALLET_VERSION,
  SeedInfo,
  Utxo,
  Stxo,
  KeyChain
} from "app/common/runtimeTypes/storage/wallets"

export const prefilledWalletCaption = "Demo wallet with example data"

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
  const epochs = { last: 0 }

  const seedInfo: SeedInfo = { seed: { chainCode, masterSecret }, kind: ("Wip3" as "Wip3") }

  const accounts = [generatePrefilledAccount()]

  return {
    id,
    _v,
    caption: prefilledWalletCaption,
    seed: seedInfo,
    epochs,
    purpose: 0x80000003,
    accounts
  }
}

/**
 * Extend the wallet if the caption matches a prefilled wallet
 * @param w wallet
 */
export const extendWalletData = (w: Wallet): Wallet => {
  let wallet = w
  if (wallet.caption === prefilledWallet.caption) {
    wallet = {
      ...prefilledWallet,
      // TODO: verify which fields shoulnd't be overriden by the prefilledWallet
      // and add them after ID or if the ID is the only field required take
      // the ID and caption as parameter instead of the wallet
      id: wallet.id,
    }
  }

  return wallet
}

/**
 * Internal function that generates a pre-filled account. Do not use outside of this module.
 */
function generatePrefilledAccount(): Account {
  const balance = 4.24
  const keyPath = [2147483651, 2147488567, 2147483648]
  const keyPath0 = [...keyPath, 0]
  const keyPath1 = [...keyPath, 1]
  const keyPath2 = [...keyPath, 2]
  const keyChains = [
    {
      kind: "external",
      keyPath: keyPath0,
      finalKeys: [generateFinalKey("external", keyPath0, 0)],
    },
    {
      kind: "internal",
      keyPath: keyPath1,
      finalKeys: [generateFinalKey("internal", keyPath1, 0)],
    },
    {
      kind: "rad",
      keyPath: keyPath2,
      finalKeys: [generateFinalKey("rad", keyPath2, 0)],
    }
  ] as Array<KeyChain>

  return { balance, keyPath, keyChains }
}

/**
 * Internal function that generates a pre-filled final key. Do not use outside of this module.
 */
function generateFinalKey(
  kind: FinalKey["kind"],
  parentPath: Array<number>,
  index: number
): FinalKey {
  const key = Buffer.from(
    [152, 8, 159, 246, 221, 27, 159, 171, 139, 98, 82, 232, 229, 140, 201, 2, 78, 113, 141, 104,
      187, 192, 191, 147, 91, 108, 192, 174, 214, 251, 100, 79])
  const chainCode = Buffer.from(
    [152, 8, 159, 246, 221, 27, 159, 171, 139, 98, 82, 232, 229, 140, 201, 2, 78, 113, 141, 104,
      187, 192, 191, 147, 91, 108, 192, 174, 214, 251, 100, 79])
  const extendedKey = { type: ("public" as "public"), key, chainCode }
  const keyPath = [...parentPath, index]
  const pkh = ""
  const outpoint = { txid: "some tx id", index: 0 }
  const output = { outpoint }
  const utxos: Array<Utxo> = [output]
  const stxos: Array<Stxo> = []

  return { kind, extendedKey, keyPath, pkh: Buffer.from(pkh), utxos, stxos } as FinalKey
}
