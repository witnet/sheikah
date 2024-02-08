import { getVersionFromName } from '../../../../../electron/walletManager'

describe('getVersionFromName', () => {
  test('should return version x.y.z from the release name', () => {
    const name = 'witnet-1.2.1'

    const version = getVersionFromName(name)

    expect(version).toBe('1.2.1')
  })
})
