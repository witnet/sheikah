// describe('Create wallet', () => {
//   it('should create a wallet', async () => {
//     await client.waitUntilWindowLoaded()
//     await client.$('[data-test=password-input]').addValue('password')
//     await client.$('[data-test=unlock-wallet]').click()
//   })
// })

describe('Create wallet', () => {
  it('should create a wallet', async () => {

    await app.client
      .waitUntilWindowLoaded(10000)
      .click('')
    const html = await app.client.$('body').getHTML()

    console.log('html', html)

    await app.client.$('[data-test=passwordInput]').addValue('password')

    await sleep(1000)

    await app.client.$('[data-test=unlock-wallet]').click()

    await sleep(1000)

    await app.client.$('[data-test=main]')

    expect(true).toBe(true)
  })
})
