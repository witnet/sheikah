describe('Create wallet', () => {
  it('should create a wallet', async () => {
    await client.waitUntilWindowLoaded()
    await client.$('[data-test=password-input]').addValue('password')
    await client.$('[data-test=unlock-wallet]').click()
  })
})
