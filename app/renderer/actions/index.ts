import { actionCreator } from "./helpers"
import { ComputedTransactions } from "app/renderer/prefilledTransactions"
import * as Actions from "./actionNames"

import { Wallet, FinalKey, WalletInfo, WalletInfos } from "app/common/runtimeTypes/storage/wallets"
import { KEYCHAIN_INDICES } from "app/common/constants/wallet"

// Action creator to save wallet
export const saveWallet = (wallet: Wallet) => {
  return actionCreator<Wallet>(Actions.SAVE_WALLET)(wallet)
}

// Action creator to save transactions
export const saveTransactions = (transactions: ComputedTransactions) => {
  return actionCreator<ComputedTransactions>(Actions.SAVE_TRANSACTIONS)(transactions)
}

// Expected params for saving a final key
export interface SaveFinalKeyParams {
  account: number,
  keyChain: KEYCHAIN_INDICES,
  finalKey: FinalKey,
}

// Action creator to save final Key
export const saveFinalKey = (params: SaveFinalKeyParams) => {
  return actionCreator<SaveFinalKeyParams>(Actions.SAVE_FINALKEY)(params)
}

// Action creator to save wallet infos
export const saveWalletInfos = (walletInfos: WalletInfos) => {
  return actionCreator<WalletInfos>(Actions.SAVE_WALLET_INFOS)(walletInfos)
}

// Action creator to save a wallet info
export const saveWalletInfo = (walletInfo: WalletInfo) => {
  return actionCreator<WalletInfo>(Actions.SAVE_WALLET_INFO)(walletInfo)
}
