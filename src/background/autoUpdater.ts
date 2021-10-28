// import { autoUpdater } from 'electron-updater'

// autoUpdater.on('update-available', () => {
//   const options = {
//     type: 'info',
//     title: 'DOClever',
//     message: `There is a new Sheikah version`,
//     buttons: ['Download and install', 'Cancel'],
//     defaultId: 0, // bound to buttons array
//     cancelId: 1, // bound to buttons array
//   }
//   isBeingUpdated = true
//   dialog.showMessageBox(null, options).then(result => {
//     if (result.response === 0) {
//       autoUpdater
//         .downloadUpdate()
//         .then(path => {
//           win.webContents.send('log', `${path}`)
//           console.log('Release path to download', path)
//         })
//         .catch(e => {
//           console.log('Error', e)
//         })
//     } else if (result.response === 1) {
//       isBeingUpdated = false
//       runWallet()
//     }
//   })
// })

// autoUpdater.on('error', err => {
//   console.log('Error in auto-updater. ' + err)
// })

// autoUpdater.on('update-downloaded', () => {
//   if (walletProcess) {
//     walletProcess.kill(9)
//   }
//   if (win != null) {
//     win.close()
//   }
//   try {
//     setImmediate(() => {
//       autoUpdater.quitAndInstall()
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })