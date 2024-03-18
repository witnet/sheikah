import { autoUpdater } from 'electron-updater'
import { BrowserWindow, MessageBoxOptions, dialog } from 'electron'
import { WalletManager } from './walletManager'
import { Actions } from './main'

export class AutoUpdaterManager {
  public isBeingUpdated: boolean = false
  public wallet
  public win

  constructor(walletManager: WalletManager, win: BrowserWindow) {
    this.wallet = walletManager
    this.win = win
  }

  public run(actions: Actions) {
    console.log('Checking for updates...')
    autoUpdater.checkForUpdatesAndNotify()
    autoUpdater.on('update-available', () => {
      this.wallet.setIsUpdating(true)
      this.showDialog(actions)
    })
    autoUpdater.on('error', err => {
      console.log('Error in auto-updater ' + err)
    })
    autoUpdater.on('update-downloaded', () => {
      this.closeWindowAndRestart(actions)
    })

    autoUpdater.autoDownload = false
  }

  showDialog(actions: Actions) {
    const options = {
      type: 'info',
      title: 'Sheikah update',
      message: `There is a new Sheikah version`,
      buttons: ['Download and install', 'Cancel'],
      defaultId: 0, // bound to buttons array
      cancelId: 1, // bound to buttons array
    } as MessageBoxOptions
    dialog.showMessageBox(this.win, options).then(result => {
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
        this.wallet.runWallet(actions)
      }
    })
  }

  private closeWindowAndRestart(actions: Actions) {
    if (this.wallet.walletProcess) {
      this.wallet.killWalletProcess()
    }
    autoUpdater.quitAndInstall(false, true)
    if (this.win == null) {
      actions.relaunch()
    }
  }
}
