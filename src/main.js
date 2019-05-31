import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faWallet, faEye, faCode, faShoppingBag, faUsers, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
