import Vue from 'vue'
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
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

  window.vm = vm
}
