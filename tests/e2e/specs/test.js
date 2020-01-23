// https://docs.cypress.io/api/introduction/api.html

describe.skip('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('.header', 'Ey, listen!')
  })
})
