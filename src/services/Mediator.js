import { EVENTS } from '@/services/Emitter'

export default class Mediator {
  constructor({ emitter, router, store, walletApi }) {
    this.emitter = emitter
    this.router = router
    this.store = store
    this.walletApi = walletApi
  }

  initialize() {
    this.emitter.on(EVENTS.API_WALLET_WS_CLOSED, () => {
      this.router.push('/wallet-not-found')
    })

    this.emitter.on(EVENTS.API_WALLET_WS_OPEN, () => {
      console.log(
        'inside api wallet ws open',
        this.store.state.wallet.walletInfos,
      )
      this.store.dispatch('getWalletInfos')
    })

    this.emitter.on(EVENTS.ROUTER_BEFORE_ENTER_MAIN, () => {
      console.log(
        'inside route before enter main',
        this.store.state.wallet.walletInfos,
      )
      const isReady = this.walletApi.client.ws.ready
      console.log('isReady', isReady)
      if (isReady) {
        this.store.dispatch('getWalletInfos')
        const isSessionId = this.store.state.wallet.sessionId
        const walletInfos = this.store.state.wallet.walletInfos
        // TODO: Uggly code
        if (isSessionId) {
        } else if (walletInfos.length > 0) {
          this.router.push('/welcome-back/wallet-list')
        } else {
          this.router.push('/ftu/welcome')
        }
      } else {
        this.router.push('/wallet-not-found')
      }
    })

    this.emitter.on(EVENTS.VUEX_WALLET_SET_WALLET_INFOS, () => {
      console.log(
        'inside vuex wallet set wallet infos',
        this.store.state.wallet.walletInfos,
      )
      if (this.store.state.wallet.walletInfos.length > 0) {
        this.router.push('/welcome-back/wallet-list')
      } else {
        this.router.push('/ftu/welcome')
      }
    })

    this.emitter.on(EVENTS.ROUTER_BEFORE_ENTER_WALLET_NOT_FOUND, () => {
      console.log('router before enter wallet not found')
      if (this.walletApi.client.ws.ready) {
        const walletInfos = this.store.state.wallet.walletInfos
        if (walletInfos.length > 0) {
          this.router.push('/welcome-back/wallet-list')
        } else {
          this.router.push('/ftu/welcome')
        }
      }
    })
  }
}
