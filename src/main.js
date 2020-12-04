import Vue from 'vue'
import { Radon } from 'witnet-radon-js'
import mitt from 'mitt'

import './plugins/element.js'
import './fontAwesome'
import '@/directives'

import createIpcHandlers from '@/ipcHandlers'
import { WalletApi, standardizeBalance } from '@/api'
import * as utils from '@/utils'
import SyncingTimeEstimator from '@/services/SyncingTimeEstimator'
import ProcessWalletEvent from '@/services/ProcessWalletEvent'
import formatMillisecondsDuration from '@/services/format/formatMillisecondsDuration'

import Mediator from '@/services/Mediator'
// import Emitter from '@/services/Emitter'
import createStore from './store'
import createRouter from './router'
import App from './App.vue'

Vue.config.productionTip = false

const emitter = mitt()

const deps = {
  ...utils,
  formatMillisecondsDuration,
  syncingTimeEstimator: new SyncingTimeEstimator(),
  eventProcessor: new ProcessWalletEvent(),
  Radon,
  standardizeBalance,
  api: {
    wallet: new WalletApi(),
  },
  emitter,
}

const store = createStore(deps)
// inject store to avoid cyclical dependence between router and store
const router = createRouter({ emit: emitter.emit })

const mediator = new Mediator({
  emitter,
  router,
  store,
  walletApi: deps.api.wallet,
})

mediator.initialize()

deps.api.wallet.client.ws.on('close', () => {
  setTimeout(() => {
    if (!deps.api.wallet.client.ws.ready) {
      emitter.emit('API_WALLET_WS_CLOSED')
    }
  }, 1000)
})

deps.api.wallet.client.ws.on('open', async () => {
  console.log('open!!')
  const interval = setInterval(() => {
    if (deps.api.wallet.client.ws.ready) {
      emitter.emit('API_WALLET_WS_OPEN')
      clearInterval(interval)
    }
  }, 500)
})

createIpcHandlers(store)

runApp(deps)

function runApp(deps) {
  const vm = new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')

  window.vm = vm
}
