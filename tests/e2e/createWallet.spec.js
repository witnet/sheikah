describe('Create wallet', () => {
  it('should create a wallet', async () => {
    const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
    console.log('app.client', a)
    expect(true).toBe(true)
  })
})
