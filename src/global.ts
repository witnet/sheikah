export {}
declare global {
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
}
