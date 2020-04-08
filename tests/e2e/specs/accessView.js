// TODO: remove skip in tests when new rust realise is ready
describe('Land correctly in every view accesible from the main page', () => {
  beforeEach(() => {
    cy.createAndUnlockWallet()
  })

  it('Redirects to the transactions view', () => {
    cy.get('[data-test=to-transactions]')
      .last()
      .click()
    cy.get('[data-test=transactions]')
  })

  it('Redirects to the templates view', () => {
    cy.get('[data-test=to-templates]')
      .last()
      .click()
    cy.get('[data-test=templates]')
  })

  it('Redirects to the correct social urls', () => {
    cy.get('[data-test=to-community]')
      .last()
      .click()
    cy.get('[data-test=community-page]')
    cy.get('[data-test=logo-to-main]').click()
    cy.get('[data-test=main]')
  })

  it('Redirects to Marketplace view', () => {
    cy.get('[data-test=to-marketplace]').click()
    cy.get('[data-test=marketplace]')
    cy.get('[data-test=to-transactions]').click()
    cy.get('[data-test=transactions]')
  })
})
