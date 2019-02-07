import { walletReducer } from "app/renderer/reducers/wallet"
import {
  emptyState, validSaveWalletAction,
  newWallet, nonEmptyState,
} from "./wallet.fixtures"

describe("Wallet renderer", () => {
  it("should update empty state with valid action", async () => {
    const newState = walletReducer(emptyState, validSaveWalletAction)
    expect(newState).toMatchObject(newWallet)
  })

  it("should update non empty state with valid action", async () => {
    const newState = walletReducer(nonEmptyState, validSaveWalletAction)
    expect(newState).toMatchObject(newWallet)
  })
})
