import { ipcRenderer } from 'electron'
import store from './store'
import { RE_START_MSG, DOWNLOADING_NEW_RELEASE_MSG } from './constants'

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
  store.commit('toggleUpdateNotification', { msg: DOWNLOADING_NEW_RELEASE_MSG })
})
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded')
  // create Notification for restarting Sheikah
  store.commit('toggleUpdateNotification', { msg: RE_START_MSG })
})
