import { ipcRenderer, contextBridge } from 'electron'
import { IPC_ACTIONS } from '../ipc/ipcActions'
const {
  SET_MESSAGE,
  SHUTDOWN,
  SET_RUNNING_STATUS,
  SET_DOWNLOADED_STATUS,
  SET_DOWNLOADING_STATUS,
  SET_DOWNLOAD_PROGRESS,
  SET_LOADED_STATUS,
  SET_OS_NOT_SUPPORTED,
  SHUTDOWN_FINISHED,
} = IPC_ACTIONS.Window

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ['complete', 'interactive'],
) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)

contextBridge.exposeInMainWorld('ipcAPI', {
  onShutdown: (fn: any) => {
    ipcRenderer.on(SHUTDOWN, (event, ...args) => fn(...args))
  },
  onMessage: (fn: any) => {
    ipcRenderer.on(SET_MESSAGE, (event, ...args) => fn(...args))
  },
  onRunningStatus: (fn: any) => {
    ipcRenderer.on(SET_RUNNING_STATUS, (event, ...args) => fn(...args))
  },
  onDownloadedStatus: (fn: any) => {
    ipcRenderer.on(SET_DOWNLOADED_STATUS, (event, ...args) => fn(...args))
  },
  onDownloadingStatus: (fn: any) => {
    ipcRenderer.on(SET_DOWNLOADING_STATUS, (event, ...args) => fn(...args))
  },
  onLoadedStatus: (fn: any) => {
    ipcRenderer.on(SET_LOADED_STATUS, (event, ...args) => fn(...args))
  },
  onDownloadProgress: (fn: any) => {
    ipcRenderer.on(SET_DOWNLOAD_PROGRESS, (event, ...args) => fn(...args))
  },
  onOSNotSupported: (fn: any) => {
    ipcRenderer.on(SET_OS_NOT_SUPPORTED, (event, ...args) => fn(...args))
  },
  sendShutdownFinished: () => {
    ipcRenderer.send(SHUTDOWN_FINISHED)
  },
})
