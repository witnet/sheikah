import { autoUpdater } from 'electron-updater'
import { WalletManager } from './walletManager'
import { dialog } from 'electron'
import { AppManager } from './appManager'


export class AutoUpdater {
  public isBeingUpdated
  public wallet
  public app

  constructor(walletManager: WalletManager, appManager: AppManager) {
    this.isBeingUpdated = false
    this.wallet = walletManager
    this.app = appManager
  }

  public init() {
    autoUpdater.on('update-available', (() => {
      console.log('::update-available::')
      const options = {
        type: 'info',
        title: 'DOClever',
        message: `There is a new Sheikah version`,
        buttons: ['Download and install', 'Cancel'],
        defaultId: 0, // bound to buttons array
        cancelId: 1, // bound to buttons array
      }
      this.wallet.updateStatus(true)
      dialog.showMessageBox(null, options).then(result => {
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
          this.wallet.updateStatus(false)
          this.wallet.runWallet()
        }
      })
    }).bind(this))
    
    autoUpdater.on('error', err => {
      console.log('Error in auto-updater. ' + err)
    })
    
    autoUpdater.on('update-downloaded', (() => {
      console.log('::update-downloaded::')
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
    }).bind(this))
  }

  public checkForUpdatesAndNotify() {
    console.log('::check for updates::')
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdatesAndNotify()
  }
}