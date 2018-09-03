import * as crypto from "crypto"
import {
  Wallet,
  Account,
  FinalKey,
  CURRENT_WALLET_VERSION,
  SeedInfo,
  Utxo,
  Stxo,
  KeyChain,
  FinalKeyMetadata
} from "app/common/runtimeTypes/storage/wallets"
import { KEYCHAIN_INDICES } from "app/common/constants/wallet"

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
  let wallet: Wallet

  // Check if prefilled wallet
  if (w.caption === prefilledWallet.caption) {
    // Concat prefilled final keys with generated final keys
    const finalKeys = prefilledWallet
      .accounts[0]
      .keyChains[KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL]
      .finalKeys
      .concat(
        w.accounts[0]
          .keyChains[KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL]
          .finalKeys
      )

    wallet = {
      ...prefilledWallet,
      // TODO: verify which fields shouldn't be overriden by the prefilledWallet
      // and add them after ID or if the ID is the only field required take
      // the ID and caption as parameter instead of the wallet
      id: w.id,
    }

    // Add final keys to prefilled wallet
    wallet
      .accounts[0]
      .keyChains[KEYCHAIN_INDICES.KEYCHAIN_EXTERNAL]
      .finalKeys = finalKeys
  } else {
    wallet = w
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
    // External key chain
    {
      kind: "external",
      keyPath: keyPath0,
      finalKeys: [
        generateFinalKey("external", keyPath0, 0, {
          label: "From Satoshi Nakamoto",
          creationDate: 1526515200,
          expirationDate: 1558051200,
          requestedAmount: 1
        }),
        generateFinalKey("external", keyPath0, 1, {
          label: "From Nick Szabo",
          creationDate: 1526515200,
          expirationDate: 1526342400,
          requestedAmount: 1
        }),
        generateFinalKey("external", keyPath0, 2, {
          label: "From Hal Finney",
          creationDate: 1526515200,
          requestedAmount: 1
        }),
        generateFinalKey("external", keyPath0, 3, {
          label: "From Peter Todd",
          creationDate: 1526515200,
          requestedAmount: 1
        }),
        generateFinalKey("external", keyPath0, 4, {
          creationDate: 1526515200,
          requestedAmount: 1
        }),
        generateFinalKey("external", keyPath0, 5, {
          label: "From Gavin Wood",
          creationDate: 1526515200,
          requestedAmount: 1
        }),
      ],
    },

    // Internal key chain
    {
      kind: "internal",
      keyPath: keyPath1,
      finalKeys: [generateFinalKey("internal", keyPath1, 0)],
    },

    // RAD key chain
    {
      kind: "rad",
      keyPath: keyPath2,
      finalKeys: [generateFinalKey("rad", keyPath2, 0)],
    }
  ] as Array<KeyChain>

  return { balance, keyPath, keyChains }
}

/**
 * Prefilled addresses of the prefilled external final keys
 */
export const prefilledAddresses = [
  "twit1qqwrr2l9emakn8k857ra8tglzyz7apg69cyhm2jd",
  "twit1qr50fefzyw52dushs6peyla223su56dqqu8cjt28",
  "twit1qr99gcgt2v6p3q6qsx7dptkwdukrjhjl5v7cyes4",
  "twit1qqn8f9w9uh0afqeps5jqgk0nxuzk4vuucgfl3mad",
  "twit1qzm54qfg3570j52pm3gvt7glcdpgpg6rzu58h9rx",
  "twit1qq6vf6x04d7vczw6e3pzparx73kk9zc6rgsn0snw"
]

/**
 * Prefilled funds of the prefilled external final keys
 */
export const prefilledFinalKeysFunds = [0, 0, 0, 0.5, 1, 2]

/**
 * Internal function that generates a pre-filled final key. Do not use outside of this module.
 */
function generateFinalKey(
  kind: FinalKey["kind"],
  parentPath: Array<number>,
  index: number,
  metadata?: FinalKeyMetadata
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
  const utxos: Array<Utxo> = []
  const stxos: Array<Stxo> = []

  return { kind, extendedKey, keyPath, pkh: Buffer.from(pkh), utxos, stxos, metadata } as FinalKey
}