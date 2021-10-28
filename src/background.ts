import { DEVELOPMENT } from "./background/constants"
import { Command } from 'commander'
import { AppManager } from "./background/appManager"
import { WalletManager } from './background/walletManager'

const app = new AppManager()
const wallet = new WalletManager(app)
const program = new Command()
program.version('0.0.1')
program.option('-w, --wallet', 'Run witnet wallet for development')
program.parse(process.argv)

app.start().then(() => {
  if (DEVELOPMENT) {
    if (program.wallet) {
      wallet.run()
    }
  
    if (process.platform === 'win32') {
      process.on('message', data => {
        if (data === 'graceful-exit') {
          console.log('app', app)
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
