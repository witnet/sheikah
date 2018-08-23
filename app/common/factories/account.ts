import {
  Account,
  KeyChain,
  ExtendedKey,
  FinalKey,
  KeyPath,
  Utxo,
  Stxo
} from "app/common/runtimeTypes/storage/wallets"

/**
 * Create an Account
 * @param keyPath
 * @param keyChains
 */
export function createAccount(keyPath: KeyPath, keyChains: Array<KeyChain>): Account {
  return {
    keyPath,
    keyChains,
    balance: 0
  }
}

/**
 * Create a KeyChain
 * @param kind
 * @param keyPath
 * @param finalKeys
 */
export function createKeyChain(
  kind: KeyChain["kind"],
  keyPath: KeyPath,
  finalKeys: Array<FinalKey>
): KeyChain {
  return {
    kind,
    keyPath,
    finalKeys
  } as KeyChain
}

/**
 * Create a FinalKey
 * @param kind
 * @param extendedKey
 * @param keyPath
 * @param pkh private key hash
 * @param utxo unspend transaction outputs
 * @param stxo spend transaction outputs
 */
export function createFinalKey(
  kind: FinalKey["kind"],
  extendedKey: ExtendedKey,
  keyPath: KeyPath,
  pkh: string,
  utxos?: Array<Utxo>,
  stxos?: Array<Stxo>
): FinalKey {
  return {
    kind,
    extendedKey,
    keyPath,
    pkh,
    utxos,
    stxos,
  } as FinalKey
}
