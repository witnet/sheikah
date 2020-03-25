import 'cypress-file-upload'
import { createSelection } from '../utils'

describe('claimingProcess', () => {
  it('Go to claiming process', () => {
    cy.visit('/')
    cy.get('[data-test=claiming]')
  })

  it('Claiming instructions', () => {
    cy.get('[data-test=instructions]')
    cy.get('[data-test=next-step]').click()
  })

  describe('Import file step', () => {
    it('redirect to import file step', () => {
      cy.get('[data-test=import-file]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=instructions]')
      cy.get('[data-test=next-step]').click()
    })

    it('Show error and do not redirect if file is not imported', () => {
      cy.get('[data-test=next-step]').click()
      cy.get('[data-test=error]')
    })

    it('UploadFile', () => {
      const fileName = 'claiming.json'
      cy.fixture(fileName).then(fileJson => {
        const fileContent = JSON.stringify(fileJson)
        console.log('fileCOntent-.---', fileContent)
        cy.get('.el-upload-dragger').upload(
          {
            fileContent,
            fileName,
            mimeType: 'application/json',
          },
          { subjectType: 'drag-n-drop' }
        )
        cy.wait(2000)
        cy.get('[data-test=next-step]').click()
      })
    })
  })

  describe('File information step', () => {
    it('navigate to file information step', () => {
      cy.get('[data-test=file-information]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=import-file]')
      cy.get('[data-test=next-step]').click()
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Vesting step', () => {
    it('navigate to file information step', () => {
      cy.get('[data-test=vesting]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=file-information]')
      cy.get('[data-test=next-step]').click()
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Create your wallet step', () => {
    it('navigate create your wallet step', () => {
      cy.get('[data-test=create-wallet]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=vesting]')
      cy.get('[data-test=next-step]').click()
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Create your wallet disclaimer step', () => {
    it('navigate create your wallet step', () => {
      cy.get('[data-test=wallet-disclaimer]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=create-wallet]')
      cy.get('[data-test=next-step]').click()
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Generate and paste mnemonics step', () => {
    it('navigate create mnemonics step', () => {
      cy.get('[data-test=wallet-seed-backup]')
    })

    it('navigate back and forward', () => {
      cy.get('[data-test=previous-step]').click()
      cy.get('[data-test=wallet-disclaimer]')
      cy.get('[data-test=next-step]').click()
    })

    it('copy mnemonics', () => {
      cy.get('[data-test=word-seed]')
        .then(textarea => {
          return createSelection(textarea, 0, 5)
        })
        .then(val => {
          cy.get('[data-test=next-step]').click()
          cy.get('input').type(val)

          cy.get('[data-test=next-step]').click()
        })
    })
  })

  describe('Encrypt wallet step', () => {
    it('navigate to wallet encryption password', () => {
      cy.get('[data-test=password]')
    })

    it('write password', () => {
      cy.get('[data-test=password]')
        .first()
        .type('password')
      cy.get('[data-test=password]')
        .last()
        .type('password')
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Loading while create wallet', () => {
    it('show loading', () => {
      cy.get('[data-test=loading]')
    })
  })

  describe('Generate addresses step', () => {
    it('navigate to generate addresses step', () => {
      cy.wait(2000)
      cy.get('[data-test=generate-addresses]')
      cy.wait(2000)
      cy.get('[data-test=next-step]').click()
    })
  })

  describe('Download File', () => {
    it('navigate to download file step', () => {
      cy.get('[data-test=download-file]')
    })
  })
})
