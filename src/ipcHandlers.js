import { ipcRenderer } from 'electron'
import store from './store'
import { RE_START_MSG } from './constants'

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
ipcRenderer.on('log', async (event, msg) => {
  console.log('[log]', msg)
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
  console.log('update available')
  ipcRenderer.removeAllListeners('update_available')
  // create Notification for downloading new Sheikah release
  store.commit('toggleUpdateNotification', { msg: RE_START_MSG })
})
