// TODO: remove skip when new addresses component merged
describe.skip('Create a complete Receive transactions flow', () => {
  it('Add Addresses correctly', () => {
    cy.createAndUnlockWallet()
    cy.get('[data-test=receive-btn]').click()
  })

  it('Copies last address generated', () => {
    cy.get('.el-dialog__headerbtn')
      .last()
      .click({ force: true })
    cy.get('[data-test=receive-modal]').should(
      'have.attr',
      'style',
      'z-index: 2001; display: none;',
    )
  })
})
