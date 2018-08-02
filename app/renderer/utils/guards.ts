import { Store } from "redux"
import { StoreState } from "app/renderer/store"

/**
 * All route guards must abide by this type.
 */
type RouteGuard = (store: Store<StoreState>) => (props: any) => boolean

/**
 * This guard checks if there are wallets in the store.
 * @param store
 */
export const ifWallets: RouteGuard = (store) => {
  const state = store.getState()

  return (props: any) => {
    return state.wallets.infos.length > 0
  }
}

/**
 * This guard checks if there is a wallet in the store.
 * @param store
 */
export const ifWallet: RouteGuard = (store) => {
  const state = store.getState()

  return (props: any) => {
    return (state.wallet !== false)
  }
}
