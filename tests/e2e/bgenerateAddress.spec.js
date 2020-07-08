describe('GenerateAddress', () => {
  it('should generate an address', async () => {
    await client.waitUntilWindowLoaded()

    const html = app.client.$('body').getHTML()
    console.log(html)

    await client.$('[data-test=password-input]').addValue('password')

    sleep(1000)

    await client.$('[data-test=unlock-wallet]').click()

    // await unlockWallet()
  })
})
