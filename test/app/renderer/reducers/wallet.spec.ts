import { walletReducer } from "app/renderer/reducers/wallet"
import {
  emptyState, validSaveWalletAction,
  newWallet, nonEmptyState,
  invalidSaveWalletAction
} from "./wallet.fixtures"

describe("Wallet renderer", () => {
  it("should update empty state with valid action", async () => {
    const newState = walletReducer(emptyState, validSaveWalletAction)
    expect(newState).toMatchObject(newWallet)
  })

  it("should not update empty state with invalid action", async () => {
    const newState = walletReducer(emptyState, invalidSaveWalletAction)
    expect(newState).toBe(false)
  })

  it("should update non empty state with valid action", async () => {
    const newState = walletReducer(nonEmptyState, validSaveWalletAction)
    expect(newState).toMatchObject(newWallet)
  })

  it("should not update non empty state with invalid action", async () => {
    const newState = walletReducer(nonEmptyState, invalidSaveWalletAction)
    expect(newState).toMatchObject(nonEmptyState)
  })
})