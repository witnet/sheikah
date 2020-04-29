// https://docs.cypress.io/api/introduction/api.html
import { createSelection } from '../utils'
describe('Create Wallet', () => {
  it('Create a wallet succesfully', () => {
    // Go to ftu form when the wallet contains a created wallet
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/')
    cy.wait(5000)
    if (Cypress.env().is_wallet_created) {
      cy.get('[data-test=select-btn]').click({ force: true })
      cy.get('[data-test=option-0]').click({ force: true })
      cy.get('[data-test=password]').type('password')
      cy.get('[data-test=unlock-wallet]').click({ force: true })
    }
    cy.get('[data-test=create-wallet]').click({ force: true })
    cy.get('[data-test=new-seed-option]').click({ force: true })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('[data-test=textarea]').type(val)
      })
    cy.get('[data-test=next-step]').click({ force: true })

    cy.get('[data-test=password]')
      .first()
      .type('password')

    cy.get('[data-test=password]')
      .last()
      .type('password')

    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=main]')
  })

  it('Show error when mnemonics don´t match', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/')
    cy.wait(5000)
    cy.get('[data-test=create-wallet]').click({ force: true })
    cy.get('[data-test=new-seed-option]').click({ force: true })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('[data-test=textarea]').type('1')
      })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=mnemonics-error-alert]').should('have.css', 'color', 'rgb(240, 132, 132)')
  })

  it('Show error when passwords don´t match', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/')
    cy.wait(5000)
    cy.get('[data-test=create-wallet]').click({ force: true })
    cy.get('[data-test=new-seed-option]').click({ force: true })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('[data-test=textarea]').type(val)
      })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=password]')
      .first()
      .type('password')
    cy.get('[data-test=password]')
      .last()
      .type('password1')
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=password-error-alert]').should('have.css', 'color', 'rgb(240, 132, 132)')
  })

  it('Show previous and next view when the button is clicked', () => {
    // Cypress.config('baseUrl', 'http://localhost:8080')
    cy.visit('/')
    cy.wait(5000)
    cy.get('[data-test=create-wallet]').click({ force: true })
    cy.get('[data-test=new-seed-option]').click({ force: true })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('[data-test=textarea]').type(val)
      })
    cy.get('[data-test=next-step]').click({ force: true })
    cy.get('[data-test=password]')
      .first()
      .type('password')
    cy.get('[data-test=password]')
      .last()
      .type('password')
    cy.get('[data-test=previous-step]').click({ force: true })
    cy.get('[data-test=header-4]')
    cy.get('[data-test=previous-step]').click({ force: true })
    cy.get('[data-test=header-3]')
    cy.get('[data-test=previous-step]').click({ force: true })
    cy.get('[data-test=header-2]')
    cy.get('[data-test=previous-step]').click({ force: true })
    cy.get('[data-test=header-1]')
  })
})
