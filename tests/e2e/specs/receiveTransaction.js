import { createSelection } from '../utils'

describe.skip('Create a complete Receive transactions flow', () => {
  it('Create a new Wallet', () => {
    cy.visit('/ftu')
    cy.get('[data-test=create-wallet]').click()
    cy.get('[data-test=do-it]').click()
    cy.get('[data-test=new-seed-option]').click()
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=word-seed]')
      .then(textarea => {
        return createSelection(textarea, 0, 5)
      })
      .then(val => {
        cy.get('[data-test=next-step]').click()
        cy.get('input').type(val)
      })
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=password-input]').type('password')
    cy.get('[data-test=repeat-password]').type('password')
    cy.get('[data-test=next-step]').click()
    cy.get('[data-test=home]')
  })
  it('Add Addresses correctly', () => {
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
