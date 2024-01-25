import { buildImportWalletBirthdate } from '@/services/birthDate'
import { describe, expect, test } from 'vitest'

describe.only('birthDate', () => {
  test('return 30 days less than the provided date', () => {
    const date = new Date('2020-12-31')

    const birthDate = buildImportWalletBirthdate(date)

    // epoch for 2020-12-31
    const epoch = 91439
    expect(birthDate).toBe(epoch)
  })

  test('return null if the date is near the genesis', () => {
    const date = new Date('2020-10-20')

    const birthDate = buildImportWalletBirthdate(date)

    expect(birthDate).toBe(null)
  })

  it.only('return null if the date is in the future', () => {
    // date 3 days in the future
    const date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

    const birthDate = buildImportWalletBirthdate(date)

    expect(birthDate).toBe(null)
  })
})
