// describe('Import wallet', () => {
//   it('should import a wallet', async () => {
//     await client.waitUntilWindowLoaded()

//     await client.$('[data-test=create-wallet').click()

//     console.log('r', await client.$('body'))
//   })
// })

describe('Import wallet', () => {
  it('should import a wallet', async () => {
    await app.client
      .waitUntilWindowLoaded(10000)
      .$('[data-test=import-wallet]')
      .click()

    await app.client
      .$('[data-test=textarea]')
      .addValue('cook habit motor figure ring hint scheme club denial uncover regular become')

    await sleep(1000)

    await app.client.$('[data-test=next-step]').click()

    await app.client.$('[data-test=password]').addValue('password')

    await sleep(1000)

    await app.client.$('[data-test=repeat-password]').addValue('password')

    await app.client.$('[data-test=main]').isDisplayed

    expect(true).toBe(true)
  })

  // it('should create a wallet', async () => {
  //   console.log('file 1 describe 1test 2')
  //   // const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
  //   expect(true).toBe(true)
  // })
})

// describe('Create wallet', () => {
//   it('should create a wallet', async () => {
//     console.log('file 1 describe 2 test 1')
//     // const a = await app.client.waitUnti10000lWindowLoaded().$('body').getHTML()
//     expect(true).toBe(true)
//   })

//   it('should create a wallet', async () => {
//     console.log('file 1 describe 2 test 2')
//     // const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
//     expect(true).toBe(true)
//   })
// })
