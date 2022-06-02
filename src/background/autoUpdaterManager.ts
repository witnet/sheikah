import { autoUpdater } from 'electron-updater'
import { BrowserWindow, dialog } from 'electron'
import { WalletManager } from './walletManager'
import { AppManager } from './appManager'
import overwriteWitnetNodeConfiguration from './utils/overwriteWitnetNodeConfiguration'
import {
  SHEIKAH_PATH,
  WITNET_CONFIG_FILE_NAME,
  URLS_PUBLIC_WITNET_NODES,
} from './constants'

export class AutoUpdaterManager {
  public isBeingUpdated: boolean = false
  public wallet
  public app

  constructor(walletManager: WalletManager, appManager: AppManager) {
    this.wallet = walletManager
    this.app = appManager
  }

  public run() {
    autoUpdater.on('update-available', this.showDialog.bind(this))
    autoUpdater.on('error', err => {
      console.log('Error in auto-updater. ' + err)
    })
    autoUpdater.on('update-downloaded', this.closeWindowAndRestart.bind(this))

    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdatesAndNotify()
  }

  private showDialog() {
    const options = {
      type: 'info',
      title: 'DOClever',
      message: `There is a new Sheikah version`,
      buttons: ['Download and install', 'Cancel'],
      defaultId: 0, // bound to buttons array
      cancelId: 1, // bound to buttons array
    }
    this.wallet.setIsUpdating(true)
    overwriteWitnetNodeConfiguration({
      sheikahPath: SHEIKAH_PATH,
      witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
      publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
    })
    dialog
      .showMessageBox(this.app.win as BrowserWindow, options)
      .then(result => {
        if (result.response === 0) {
          autoUpdater
            .downloadUpdate()
            .then(path => {
              console.log('Release path to download', path)
            })
            .catch(e => {
              console.log('Error', e)
            })
        } else if (result.response === 1) {
          this.wallet.setIsUpdating(false)
          this.wallet.runWallet()
        }
      })
  }

  private closeWindowAndRestart() {
    if (this.wallet.walletProcess) {
      this.wallet.walletProcess.kill(9)
    }
    if (this.app.win != null) {
      this.app.closeWindow()
    }
    try {
      setImmediate(() => {
        autoUpdater.quitAndInstall()
      })
    } catch (err) {
      console.log(err)
    }
  }
}
