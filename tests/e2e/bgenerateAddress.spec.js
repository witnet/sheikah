describe('GenerateAddress', () => {
  it('should generate an address', async () => {
    await client.waitUntilWindowLoaded()
    await client.$('[data-test=password-input]').addValue('password')

    sleep(1000)

    await client.$('[data-test=unlock-wallet]').click()

    // await unlockWallet()

    const html = await app.client.$('body').getHTML()

    console.log('html', html)
  })
})
