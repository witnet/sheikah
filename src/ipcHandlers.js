import { ipcRenderer } from 'electron'
import store from './store'

ipcRenderer.on('shutdown', async () => {
  await store.dispatch('shutdown')
  ipcRenderer.send('shutdown-finished')
})
ipcRenderer.on('running', async () => {
  store.commit('setMessage', { message: 'Running wallet' })
})
ipcRenderer.on('downloading', async () => {
  store.commit('setMessage', { message: 'Downloading wallet' })
})
ipcRenderer.on('loaded', async () => {
  store.commit('setMessage', { message: 'loaded' })
})
ipcRenderer.on('downloaded', async () => {
  store.commit('setMessage', { message: 'wallet up to date' })
})
ipcRenderer.on('log', async () => {
  console.log('re-start')
})
ipcRenderer.on('progress', async (event, progress) => {
  store.commit('setProgress', { progress: progress.percentage })
})
ipcRenderer.send('app_version')
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version')
  console.log(arg.version)
})
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available')
  // create Notification for downloading new Sheikah release
  store.commit('toggleUpdateNotification')
})
