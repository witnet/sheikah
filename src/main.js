import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { WalletApi } from './api'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog, faAngleRight, faAngleLeft, faCircle, faSortDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueQrcode from '@chenfengyuan/vue-qrcode'

library.add(faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog, faAngleRight, faAngleLeft, faCircle, faSortDown, faAngleUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component(VueQrcode.name, VueQrcode)

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
