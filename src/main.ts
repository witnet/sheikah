import { WalletApi } from '@/api'
import router from '@/router'
import store from '@/store'
import i18n from '@/plugins/i18n'
import ProcessWalletEvent from './services/ProcessWalletEvent'
import { checkDisconnection } from './services/checkDisconnection'
import { LocalStorageWrapper } from '@/api'
import ElementPlus from 'element-plus'
import './fontAwesome'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import '@/ipcHandlers'

const api = new WalletApi()
const eventProcessor = new ProcessWalletEvent()
const localStorageWrapper = new LocalStorageWrapper()

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('localStorageWrapper', localStorageWrapper)
app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus)

app.directive('focus', {
  updated: function (el, binding) {
    if (binding.arg === 'true') {
      if (el.getElementsByTagName('input')) {
        el.getElementsByTagName('input')[0].focus()
      } else {
        el.focus()
      }
    }
  },
  mounted: function (el) {
    // It focus the element and add support for element ui inputs
    el.getElementsByTagName('input')
      ? el.getElementsByTagName('input')[0].focus()
      : el.focus()
  },
})

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
  checkDisconnection(router, store)
})

export { api, eventProcessor }
