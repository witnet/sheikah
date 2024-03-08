import {
  onDownloadedStatus,
  onRunningStatus,
  onLoadedStatus,
  onDownloadProgress,
  onOSNotSupported,
  onMessage,
  onShutdown,
} from '@/ipc/ipcEvents'
import { sendShutdownFinished } from '@/ipc/ipcMessages'
import { Router } from 'vue-router'

export function listenIpcMainEvents({
  store,
  router,
}: {
  store: any
  router: Router
}) {
  onShutdown(async () => {
    await store.dispatch('shutdown')
    sendShutdownFinished()
  })
  onMessage((message: string) => {
    console.log('Message from Main process:', message)
  })
  onDownloadProgress((progress: any) => {
    store.commit('setMessage', { message: 'Updating wallet backend' })
    store.commit('setProgress', { progress: progress.percentage })
  })
  onDownloadedStatus(() => {
    store.commit('setMessage', { message: 'wallet up to date' })
  })
  onLoadedStatus((message: any) => {
    if (Array.isArray(message) && message[0].isDefaultWallet) {
      store.commit('setWalletOwner', { isDefaultWallet: true })
    }
    store.commit('setMessage', { message: 'loaded' })
  })
  onRunningStatus(() => {
    store.commit('setMessage', { message: 'Running wallet' })
  })
  onOSNotSupported(() => {
    router.push('/wallet-not-found')
  })
}
