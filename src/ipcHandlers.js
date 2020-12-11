import { ipcRenderer } from 'electron'
import store from './store'

ipcRenderer.send('app_version')

ipcRenderer.on('shutdown', async () => {
  await store.dispatch('shutdown')
  ipcRenderer.send('shutdown-finished')
})

ipcRenderer.on('closeWallet', async () => {
  await store.dispatch('shutdown')
  ipcRenderer.send('close-wallet')
})

ipcRenderer.on('log', async (event, message) => {
  console.log(message)
})

ipcRenderer.on('running', async (event, message) => {
  store.commit('setMessage', { message: 'Running wallet' })
})

ipcRenderer.on('downloading', async () => {
  store.commit('setMessage', { message: 'Updating wallet backend' })
})

export function setLocalNodeUrl(url) {
  ipcRenderer.send('change-node-url', url)
}

ipcRenderer.on('loaded', async (e, message) => {
  if (Array.isArray(message) && message[0].isDefaultWallet) {
    store.commit('setWalletOwner', { isDefaultWallet: true })
  }

  store.commit('setMessage', { message: 'loaded' })
})

ipcRenderer.on('downloaded', async () => {
  store.commit('setMessage', { message: 'wallet up to date' })
})

ipcRenderer.on('progress', async (event, progress) => {
  store.commit('setProgress', { progress: progress.percentage })
})

ipcRenderer.on('update_available', () => {
  // create Notification for downloading new Sheikah release
  store.commit('showUpdateNotification')
})
