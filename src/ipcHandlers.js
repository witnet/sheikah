// import { ipcRenderer } from 'electron'
import store from './store'

window.ipcRenderer.on('shutdown', async () => {
  await store.dispatch('shutdown')
  window.ipcRenderer.send('shutdown-finished')
})

window.ipcRenderer.on('running', async () => {
  store.commit('setMessage', { message: 'Running wallet' })
})

window.ipcRenderer.on('downloading', async () => {
  store.commit('setMessage', { message: 'Updating wallet backend' })
})

window.ipcRenderer.on('loaded', async (e, message) => {
  if (Array.isArray(message) && message[0].isDefaultWallet) {
    store.commit('setWalletOwner', { isDefaultWallet: true })
  }

  store.commit('setMessage', { message: 'loaded' })
})

window.ipcRenderer.on('downloaded', async () => {
  store.commit('setMessage', { message: 'wallet up to date' })
})

window.ipcRenderer.on('progress', async (event, progress) => {
  store.commit('setProgress', { progress: progress.percentage })
})

window.ipcRenderer.on('update_available', () => {
  // create Notification for downloading new Sheikah release
  store.commit('showUpdateNotification')
})
