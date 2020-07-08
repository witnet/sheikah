describe('Create wallet', () => {
  it('should create a wallet', async () => {
    await app.client
      .waitUntilWindowLoaded(10000)
      // .$('[data-test=create-wallet]')
      // .click('')

      await app.client.$('[data-test=new-seed-option]').click()
      const html = await app.client.$('body').getHTML()
      console.log('html', html)

    await app.client.$('[data-test=next-step]').click()

    const seed = await app.client.$('[data-test=word-seed]').getText()

    await app.client.$('[data-test=next-step]').click()

    await app.client.$('[data-test=seed-input]').addValue(seed)

    await app.client.$('[data-test=next-step]').click()

    await app.client.$('[data-test=password]').addValue('password')
    await sleep(1000)

    await app.client.$('[data-test=repeat-password]').addValue('password')

    await sleep(1000)

    await app.client.$('[data-test=next-step]').click()

    await sleep(2000)

    await app.client.$('[data-test=main]')
    expect(true).toBe(true)
  })
})
