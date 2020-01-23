describe('Create a complete deploy Data Request flow', () => {
  it('Redirects to Templates view', () => {
    cy.createAndUnlockWallet()
    cy.get('[data-test=to-templates]').click()
    cy.get('[data-test=templates]')
  })
  it('Creates template', () => {
    cy.get('[data-test=create-template]').click()
    cy.get('[data-test=editor-view]')
  })
  it('Saves template', () => {
    cy.get('[data-test=action-Save]').click()
  })
  it('Go back to templates list', () => {
    cy.get('[data-test=go-back-to-templates]').click()
  })
  it('Deletes template', () => {
    cy.get('[data-test=template-Delete]')
      .last()
      .click({ force: true })
  })
  it('Creates template', () => {
    cy.get('[data-test=create-template]').click()
    cy.get('[data-test=editor-view]')
  })
  it('Saves template', () => {
    cy.get('[data-test=action-Save]').click()
  })
  it('Go back to templates list', () => {
    cy.get('[data-test=go-back-to-templates]').click()
  })
  it('Edit template', () => {
    cy.get('[data-test=edit-template]')
      .last()
      .click()
    cy.get('[data-test=editor-view]')
  })
  it('Go back to templates list', () => {
    cy.get('[data-test=go-back-to-templates]').click()
  })
  it('Rename templates', () => {
    cy.get('[data-test=template-Rename]')
      .last()
      .click({ force: true })
    cy.get('[data-test=template-name-input]')
      .last()
      .and('be.visible')
      .clear()
      .type('1')
    cy.get('[data-test=to-templates]')
      .last()
      .click()
    cy.get('[data-test=template-name-input]')
      .last()
      .should('have.value', '1')
  })
  it('Deploy', () => {
    cy.get('[data-test=template-Deploy]')
      .first()
      .click({ force: true })
    cy.get('[data-test=variables-dr-form]').should('be.visible')
    cy.get('[data-test=variable-value-input]')
      .first()
      .clear()
      .type('1')
    cy.get('[data-test=sign-send-btn]').click()
    cy.get('[data-test=variables-dr-form]').should('not.be.visible')
    cy.get('[data-test=fees-dr-form]').should('be.visible')
    cy.get('[data-test=tx-amount]')
      .first()
      .clear()
      .type('1')
    cy.get('[data-test=sign-send-btn]').click()
    if (cy.get('[data-test=confirm-deploy-dr]').and('not.be.visible')) {
      cy.get('[data-test=alert]').should('be.visible')
    } else {
      cy.get('[data-test=fees-dr-form]').should('not.be.visible')
      cy.get('[data-test=sign-send-btn]').click()
    }
  })
})
