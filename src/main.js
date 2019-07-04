import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { WalletApi } from './api'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog, faAngleRight, faAngleLeft, faCircle, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog, faAngleRight, faAngleLeft, faCircle, faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const walletApi = new WalletApi()

const isSocketReady = setInterval(checkSocketStatus, 1)

function checkSocketStatus () {
  if (walletApi.client.ws.ready) {
    runApp()
  }
}

function runApp () {
  clearInterval(isSocketReady)

  store.$walletApi = walletApi

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
