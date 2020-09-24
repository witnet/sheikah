import { ipcRenderer } from 'electron'
import store from './store'

ipcRenderer.send('app_version')

ipcRenderer.on('shutdown', async () => {
  await store.dispatch('shutdown')
  ipcRenderer.send('shutdown-finished')
})

ipcRenderer.on('running', async () => {
  store.commit('setMessage', { message: 'Running wallet' })
})

ipcRenderer.on('downloading', async () => {
  store.commit('setMessage', { message: 'Updating wallet backend' })
})

ipcRenderer.on('loaded', async () => {
  store.commit('setMessage', { message: 'loaded' })
})

ipcRenderer.on('downloaded', async () => {
  store.commit('setMessage', { message: 'wallet up to date' })
})

ipcRenderer.on('progress', async (event, progress) => {
  store.commit('setProgress', { progress: progress.percentage })
})

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available')
  // create Notification for downloading new Sheikah release
  store.commit('showUpdateNotification')
})
