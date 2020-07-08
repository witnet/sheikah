describe('GenerateAddress', () => {
  it('should generate an address', async () => {
    await client.waitUntilWindowLoaded()

    await client.$('[data-test=password-input]').addValue('password')

    sleep(1000)

    await client.$('[data-test=unlock-wallet]').click()

    sleep(1000)

    await app.client.$('[data-test=generate-address]').click()

    sleep(2000)

    await app.client.$('[data-test=address-0]').click()

    const html = await app.client.$('body').getHTML()

    console.log(html)
  })
})
