// Get vuex instance from window
Cypress.Commands.add('vuex', () => {
  cy.visit('/')
  cy.window().its('vm.$store')
})

// Create a wallet and set it in vuex store
Cypress.Commands.add('createAndUnlockWallet', () => {
  cy.vuex().invoke('dispatch', 'createWallet', {
    sourceType: 'mnemonics',
    password: 'password',
    mnemonics:
      'soldier design onion below soldier judge lock discover load hour option atom',
  })
  cy.wait(2000)
})
