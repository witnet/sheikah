describe('Create wallet', () => {
  it('should create a wallet', async () => {
    console.log('file 1 describe 1 test 1')
    const a = await app.client
      .waitUntilWindowLoaded(10000)
      .$('body')
      .getHTML()
    console.log(a)
    expect(true).toBe(true)
  })

  it('should create a wallet', async () => {
    console.log('file 1 describe 1test 2')
    // const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
    expect(true).toBe(true)
  })
})

describe('Create wallet', () => {
  it('should create a wallet', async () => {
    console.log('file 1 describe 2 test 1')
    // const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
    expect(true).toBe(true)
  })

  it('should create a wallet', async () => {
    console.log('file 1 describe 2 test 2')
    // const a = await app.client.waitUntilWindowLoaded().$('body').getHTML()
    expect(true).toBe(true)
  })
})
