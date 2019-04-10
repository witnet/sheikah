import { Store } from "redux"
import { StoreState } from "app/renderer/store"

/**
 * All route guards must abide by this type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteGuard = (store: Store<StoreState>) => (props: any) => boolean

/**
 * This guard checks if there are wallets in the store.
 * @param store
 */
export const ifWallets: RouteGuard = (store) => {
  const state = store.getState()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  return (props: any) => {
    return state.walletInfos.infos.length > 0
  }
}

/**
 * This guard checks if there is a wallet in the store.
 * @param store
 */
export const ifWallet: RouteGuard = (store) => {
  const state = store.getState()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
  return (props: any) => {
    return (state.wallet !== false)
  }
}
