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
ipcRenderer.on('progress', async (event, progress) => {
  store.commit('setProgress', { progress: progress.percentage })
})
