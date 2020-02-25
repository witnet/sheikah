// TODO: remove skip in tests when new rust realise is ready
describe('Create a complete Receive transactions flow', () => {
  it('Add Addresses correctly', () => {
    cy.createAndUnlockWallet()
    cy.get('[data-test=receive-btn]').click()
    cy.get('[data-test=receive-modal]')
  })

  it('Copies last address generated and closes modal', () => {
    cy.get('.el-dialog__headerbtn')
      .last()
      .click({ force: true })
    cy.get('[data-test=receive-modal]').should(
      'have.attr',
      'style',
      'z-index: 2001; display: none;'
    )
  })
})
