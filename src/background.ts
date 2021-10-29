import { DEVELOPMENT } from "./background/constants"
import { Command } from 'commander'
import { AppManager } from "./background/appManager"
import { WalletManager } from './background/walletManager'
import { AutoUpdater } from "./background/autoUpdater"

const app = new AppManager()
const wallet = new WalletManager(app)
const autoUpdater = new AutoUpdater(wallet, app)
const program = new Command()
program.version('0.0.1')
program.option('-w, --wallet', 'Run witnet wallet for development')
program.parse(process.argv)

app.start().then(() => {
  console.log('::before check::')
  autoUpdater.init()
  autoUpdater.checkForUpdatesAndNotify()
  if (DEVELOPMENT) {
    if (program.wallet) {
      wallet.run()
    }
  
    if (process.platform === 'win32') {
      process.on('message', data => {
        if (data === 'graceful-exit') {
          app.sendShutdownMessage()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.sendShutdownMessage()
      })
    }
  } else {
    wallet.run()
  }
})
