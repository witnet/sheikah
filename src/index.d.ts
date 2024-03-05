declare module 'element-plus/dist/locale/*.js'
declare module '*.svg' {
  const content: string
  export default content
}
declare module 'vuex' {
  function useStore<T = any>(key?: string): T
}

interface Window {
  ipcAPI: {
    onShutdown: (fn: any) => void
    onMessage: (fn: any) => void
    onRunningStatus: (fn: any) => void
    onDownloadedStatus: (fn: any) => void
    onDownloadingStatus: (fn: any) => void
    onLoadedStatus: (fn: any) => void
    onDownloadProgress: (fn: any) => void
    onOSNotSupported: (fn: any) => void
    sendShutdownFinished: () => void
  }
}
