import { getVersionFromName } from '../../../../../src/background/utils/getVersionFromName'

describe('getVersionFromName', () => {
  it('should return version x.y.z from the release name', () => {
    const name = 'witnet-1.2.1'

    const version = getVersionFromName(name)

    expect(version).toBe('1.2.1')
  })
})
