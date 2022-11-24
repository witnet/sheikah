// import IdleVue from 'idle-vue'
import { WalletApi, LocalStorageWrapper } from './api'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import ProcessWalletEvent from './services/ProcessWalletEvent'

// import ElementPlus from 'element-plus'

import './fontAwesome'

import "~/styles/element-variables.scss";
// import "~/styles/index.scss";
// import 'uno.css
import "~/styles/index.scss"
import 'uno.css'

// import '@/ipcHandlers'

// declare let window: any

// Vue.config.productionTip = false

// const eventsHub = new Vue()
// Vue.use(IdleVue, {
//   eventEmitter: eventsHub,
//   store,
//   idleTime: 900000,
//   startAtIdle: false,
// })

// runApp()
// function runApp() {
//   const vm = new Vue({
//     // i18n,
//     router,
//     store,
//     render: h => h(App),
//   }).$mount('#app')

//   window.vm = vm
// }

const api = new WalletApi()
const localStorageWrapper = new LocalStorageWrapper()
const eventProcessor = new ProcessWalletEvent()

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
  
  // app.use(ElementPlus)
  app.use(router)
  app.use(store)
  app.use(i18n)

  app.directive('focus', {
    updated: function (el, binding) {
      console.log('binding', binding)
      if (binding.arg === "true") {
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




  app.component('font-awesome-icon', FontAwesomeIcon)

  app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })

export { api, localStorageWrapper, eventProcessor }