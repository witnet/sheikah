import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { ipcRenderer } from 'electron'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './fontAwesome'
import '@/directives'

ipcRenderer.on('shutdown', async () => {
  await store.dispatch('shutdown')
  ipcRenderer.send('shutdown-finished')
})

Vue.component(VueQrcode.name, VueQrcode)
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
