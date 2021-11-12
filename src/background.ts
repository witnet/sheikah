import { program } from 'commander'
import { DEVELOPMENT } from './background/constants'
import { AppManager } from './background/appManager'
import { WalletManager } from './background/walletManager'
import { AutoUpdaterManager } from './background/autoUpdaterManager'

const app = new AppManager()
const walletManager = new WalletManager(app)
const autoUpdater = new AutoUpdaterManager(walletManager, app)

// Define CLI arguments
const options = program
  .version('0.0.1')
  .option('-w, --wallet', 'Run witnet wallet for development')
  .parse(process.argv)
  .opts()

app.run().then(() => {
  autoUpdater.run()

  if (DEVELOPMENT) {
    if (options.wallet) {
      walletManager.run()
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
    walletManager.run()
  }
})
