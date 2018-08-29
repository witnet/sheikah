import { actionCreator } from "./helpers"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"
import * as Actions from "./actionNames"

import { Wallet, FinalKey } from "app/common/runtimeTypes/storage/wallets"
import { KEYCHAIN_INDICES } from "app/renderer/constants/wallet"

// Action creator to save wallet
export const saveWallet = (wallet: Wallet) => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}

// Action creator to save wallet
export const saveTransactions = (transactions: ComputedTransactions) => {
  return actionCreator<ComputedTransactions>(Actions.SAVE_TRANSACTIONS)(transactions)
}

// Expected params for saving a final key
export type SaveFinalKeyParams = {
  account: number,
  keyChain: KEYCHAIN_INDICES,
  finalKey: FinalKey
}

// Action creator to save final Key
export const saveFinalKey = (params: SaveFinalKeyParams) => {
  return actionCreator<SaveFinalKeyParams>(Actions.SAVE_FINALKEY)(params)
}