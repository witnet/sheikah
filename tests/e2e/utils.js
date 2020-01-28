import { WalletApi } from '../../src/api'

export function createSelection(field, start, end) {
  if (field.createTextRange) {
    var selRange = field.createTextRange()
    selRange.collapse(true)
    selRange.moveStart('character', start)
    selRange.moveEnd('character', end)
    selRange.select()
  } else if (field.setSelectionRange) {
    field.setSelectionRange(start, end)
  } else if (field.selectionStart) {
    field.selectionStart = start
    field.selectionEnd = end
  }
  field.focus()
  return field[0].innerHTML
}

export async function createAndUnlockWallet() {
  const api = new WalletApi()
  const promise = new Promise((resolve, reject) => {
    api.client.ws.on('open', async () => {
      const createWallet = await api.createWallet({
        caption: 'test',
        name: 'test',
        password: 'password',
        seedData: 'soldier design onion below soldier judge lock discover load hour option atom',
        seedSource: 'mnemonics',
      })

      const openWallet = await api.unlockWallet({
        walletId: createWallet.result.walletId,
        password: 'password',
      })

      resolve({ ...openWallet.result, walletId: createWallet.result.walletId })
    })
  })

  const openWallet = await promise

  cy.visit('/')

  const win = await cy.window()
  const vueInstance = win.vm

  vueInstance.$store.state.wallet.sessionId = openWallet.sessionId
  vueInstance.$store.state.wallet.walletId = openWallet.walletI
}
