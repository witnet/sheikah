import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './fontAwesome'
import '@/directives'
import '@/ipcHandlers'

Vue.component(VueQrcode.name, VueQrcode)
Vue.config.productionTip = false

runApp()
function runApp() {
  const vm = new Vue({
    // inject store to avoid cyclical dependence between router and store
    router: router(store),
    store,
    render: h => h(App),
  }).$mount('#app')

  window.vm = vm
}
