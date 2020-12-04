import mitt from 'mitt'

export const EVENTS = {
  API_WALLET_WS_CLOSED: 'API_WALLET_WS_CLOSED',
  API_WALLET_WS_OPEN: 'API_WALLET_WS_OPEN',
  ROUTER_BEFORE_ENTER_MAIN: 'ROUTER_BEFORE_ENTER_MAIN',
  ROUTER_BEFORE_ENTER_WALLET_NOT_FOUND: 'ROUTER_BEFORE_ENTER_WALLET_NOT_FOUND',
  VUEX_WALLET_SET_WALLET_INFOS: 'VUEX_WALLET_SET_WALLET_INFOS',
}

export default class Emitter {
  constructor() {
    this.emitter = mitt()
  }

  emit(e, args) {
    const eventName = EVENTS[e]

    if (!eventName) {
      console.warn(`[EMITTER WARN]: ${e} is not a valid event to emit`)
    } else {
      return this.emitter.emit(eventName, args)
    }
  }

  on(e, handler) {
    const eventName = EVENTS[e]
    if (!eventName) {
      console.warn(`[EMITTER]: ${e} is not a valid event to listen`)
    } else {
      return this.emitter.on(e, handler)
    }
  }
}
