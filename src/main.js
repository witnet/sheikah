import Vue from 'vue'
import { Radon } from 'witnet-radon-js'

import './plugins/element.js'
import './fontAwesome'
import '@/directives'

import createIpcHandlers from '@/ipcHandlers'
import { WalletApi, standardizeBalance } from '@/api'
import * as utils from '@/utils'
import SyncingTimeEstimator from '@/services/SyncingTimeEstimator'
import ProcessWalletEvent from '@/services/ProcessWalletEvent'
import formatMillisecondsDuration from '@/services/format/formatMillisecondsDuration'

import createStore from './store'
import createRouter from './router'
import App from './App.vue'

Vue.config.productionTip = false

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
}

const store = createStore(deps)
// inject store to avoid cyclical dependence between router and store
const router = createRouter({ store, ...deps })

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
