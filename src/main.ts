import Vue from 'vue'
import IdleVue from 'idle-vue'
import { WalletApi, LocalStorageApi } from './api'
import App from './App.vue'
import router from './router'
import store from './store'
import ProcessWalletEvent from './services/ProcessWalletEvent'
import i18n from '@/plugins/i18n'
import './plugins/element.js'
import './fontAwesome'
import '@/directives'
import '@/ipcHandlers'
// TODO: delete
declare let window: any

const api = new WalletApi()
const localStorageWrapper = new LocalStorageApi()
const eventProcessor = new ProcessWalletEvent()

Vue.config.productionTip = false

const eventsHub = new Vue()
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 900000,
  startAtIdle: false,
})

runApp()
function runApp() {
  const vm = new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

  window.vm = vm
}

export { api, localStorageWrapper, eventProcessor }
