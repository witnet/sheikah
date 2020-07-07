describe('Create wallet', () => {
  it('should create a wallet', async () => {
    await client
      .waitUntilWindowLoaded()
    const r = await app.client.$('body').getHTML()
    await client.$('[data-test=password-input]').addValue('password')

    await client.$('[data-test=unlock-wallet]').click()
    console.log('r', r)
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
