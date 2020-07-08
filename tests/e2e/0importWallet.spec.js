describe('Import wallet', () => {
  it('should import a wallet', async () => {
    await app.client
      .waitUntilWindowLoaded(10000)
      .$('[data-test=import-wallet]')
      .click()

    await app.client
      .$('[data-test=textarea]')
      .addValue(
        'cook habit motor figure ring hint scheme club denial uncover regular become',
      )

    await sleep(1000)

    await app.client.$('[data-test=next-step]').click()

    await app.client.$('[data-test=password]').addValue('password')

    await sleep(1000)

    await app.client.$('[data-test=repeat-password]').addValue('password')

    await app.client.$('[data-test=main]').isDisplayed()

    expect(true).toBe(true)
  })
})
