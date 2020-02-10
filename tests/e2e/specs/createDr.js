describe('Create a complete Receive transactions flow', () => {
  it('Redirects to the templates view', () => {
    cy.createAndUnlockWallet()
    cy.get('[data-test=to-templates]')
      .last()
      .click()
    cy.get('[data-test=templates]')
  })

  it('Creates template', () => {
    cy.get('[data-test=create-template]').click()
    cy.get('[data-test=editor-view]')
  })

  it('Adds a source', () => {
    cy.get('[data-test=add-source-btn]').click()
  })

  it('Deletes a source', () => {
    cy.get('[data-test=delete-source-btn]')
      .first()
      .click({ force: true })
  })

  it('Undo changes', () => {
    cy.get('[data-test=action-Undo]').click()
  })

  it('Redo changes', () => {
    cy.get('[data-test=action-Redo]').click()
  })

  it('Add operator', () => {
    cy.get('[data-test=select-btn]')
      .first()
      .click()

    cy.get('[data-test=select-btn]')
      .last()
      .click()
    cy.get('[data-test=option-7]')
      .last()
      .click({ force: true })
    cy.get('[data-test=add-operator-btn]')
      .first()
      .click()

    cy.get('[data-test=option-6]')
      .last()
      .click({ force: true })

    cy.get('[data-test=add-operator-btn]')
      .first()
      .click()

    cy.get('[data-test=option-6]')
      .last()
      .click({ force: true })

  })
  it('Add variable and edit', () => {
    cy.get('[data-test=console-tab]')
      .first()
      .click()
    cy.get('[data-test=add-var-btn]').click()
    cy.get('[data-test=edit-var]')
      .first()
      .click()
    cy.get('[data-test=edit-var-input]')
      .first()
      .clear()
      .type('a')
    cy.get('[data-test=edit-var-value-input]')
      .first()
      .clear()
      .type('1')
  })
  it('Insert variable in argument input', () => {
    cy.get('[data-test=argument-input]')
      .first()
      .clear()
      .type('$a')
    cy.get('[data-test=variable-link-icon]').and('be.visible')
  })
  it('Delete variable', () => {
    cy.get('[data-test=delete-var-btn]')
      .last()
      .click()
  })
  it('Edit variable and change input in argument', () => {
    cy.get('[data-test=add-var-btn]').click()
    cy.get('[data-test=edit-var]')
      .first()
      .click()
    cy.get('[data-test=edit-var-input]')
      .first()
      .clear()
      .type('b')
    cy.get('[data-test=edit-var-value-input]')
      .first()
      .clear()
      .type('1')
    cy.get('[data-test=argument-input]')
      .first()
      .should('have.value', '$b')
  })
  it('Insert variable in argument input', () => {
    cy.get('[data-test=argument-input]')
      .last()
      .clear()
      .type('$hi')
    cy.get('[data-test=variable-link-icon]').and('be.visible')
  })
  it('Edit variable and change input in argument', () => {
    cy.get('[data-test=add-var-btn]').click()
    cy.get('[data-test=edit-var]')
      .last()
      .click()
    cy.get('[data-test=edit-var-input]')
      .last()
      .clear()
      .type('hi')
    cy.get('[data-test=edit-var-value-input]')
      .last()
      .clear()
      .type('1')
    cy.get('[data-test=argument-input]')
      .last()
      .should('have.value', '$hi')
  })

  it('Adds a source', () => {
    cy.get('[data-test=add-source-btn]').click()
  })

  it('Adds a source', () => {
    cy.get('[data-test=add-source-btn]').click()
  })

  it('Add operator', () => {
    cy.get('[data-test=add-operator-btn]')
      .last()
      .click()
    cy.get('[data-test=select-btn]')
      .last()
      .click()
    cy.get('[data-test=option-1]')
      .last()
      .click({ force: true })
  })

  it('Saves template', () => {
    cy.get('[data-test=action-Save]').click()
    cy.get('[data-test=source-content]')
      .its('length')
      .should('eq', 2)
    cy.get('[data-test=radon-operator]')
      .its('length')
      .should('eq', 3)
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
})
