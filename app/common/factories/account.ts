import {
  Account,
  KeyChain,
  ExtendedKey,
  FinalKey,
  KeyPath,
  Input,
  Output
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
 * @param keyPath
 * @param finalKeys
 */
export function createKeyChain(keyPath: KeyPath, finalKeys: Array<FinalKey>): KeyChain {
  return {
    keyPath,
    finalKeys
  }
}

/**
 * Create a FinalKey
 * @param extendedKey
 * @param keyPath
 * @param pkh private key hash
 * @param utxo unspend transaction outputs
 * @param stxo spend transaction outputs
 */
export function createFinalKey(
  extendedKey: ExtendedKey,
  keyPath: KeyPath,
  pkh: string,
  utxo?: Array<Output>,
  stxo?: Array<Input>
): FinalKey {
  return {
    extendedKey,
    keyPath,
    pkh,
    utxo,
    stxo,
  }
}
