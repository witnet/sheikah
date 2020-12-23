import Vue from 'vue'
import i18n from '@/plugins/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './fontAwesome'
import '@/directives'
import '@/ipcHandlers'

Vue.config.productionTip = false

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
