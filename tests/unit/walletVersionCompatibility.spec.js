import semver from 'semver'

describe('Semver', () => {
  describe('should check wallet version compatibility', () => {
    test('gets the version from name', () => {
      const name = 'wtestnet-1.2.0'

      const result = semver.valid(semver.coerce(name))
      const expected = '1.2.0'

      expect(result).toBe(expected)
    })

    test('it should show compatibility if the version is a patch', () => {
      const currentWalletVersion = '1.2.0'
      const newWalletVersion = '1.2.1'

      const result = semver.satisfies(
        newWalletVersion,
        `~${currentWalletVersion}`,
      )

      expect(result).toBe(true)
    })

    test('it should result incompatible if the new version is a minor', () => {
      const currentWalletVersion = '1.1.1'
      const newWalletVersion = '1.2.1'

      const result = semver.satisfies(
        newWalletVersion,
        `~${currentWalletVersion}`,
      )

      expect(result).toBe(false)
    })

    test('it should result incompatible if the new version is a major', () => {
      const currentWalletVersion = '0.1.1'
      const newWalletVersion = '1.2.1'

      const result = semver.satisfies(
        newWalletVersion,
        `~${currentWalletVersion}`,
      )

      expect(result).toBe(false)
    })
  })
})
