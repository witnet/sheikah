import BigNumber from '@/utils/BigNumber'
import { describe, expect, test } from 'vitest'

describe('BigNumber', () => {
  describe('should return the correct result when operating big numbers', () => {
    test('should return the correct result of the sum', () => {
      const number = '9007199254740999'
      const bigNumber = new BigNumber(number)

      const result = bigNumber.plus('1')

      expect(result.toString()).toBe('9007199254741000')
    })

    test('should return the correct result of the multiplication', () => {
      const number = '9007199254740999'
      const bigNumber = new BigNumber(number)

      const result = bigNumber.times('10')

      expect(result.toString()).toBe('90071992547409990')
    })

    test('should return the correct result of raising to a power', () => {
      const number = '25'
      const bigNumber = new BigNumber(number)

      const exponent = new BigNumber(10).pow(17)
      const result = bigNumber.times(exponent)

      expect(result.toString()).toBe('2500000000000000000')
    })

    test('should return -1 when comparing a smaller number', () => {
      const bigNumber = new BigNumber('18446744073709551614')
      const maxNumber = new BigNumber('18446744073709551615')

      const result = bigNumber.cmp(maxNumber)

      expect(result).toBe(-1)
    })

    test('should return 1 when comparing a bigger number', () => {
      const bigNumber = new BigNumber('18446744073709551616')
      const maxNumber = new BigNumber('18446744073709551615')

      const result = bigNumber.cmp(maxNumber)

      expect(result).toBe(1)
    })

    test('should return 0 when comparing an equal number', () => {
      const bigNumber = new BigNumber('18446744073709551615')
      const maxNumber = new BigNumber('18446744073709551615')

      const result = bigNumber.cmp(maxNumber)

      expect(result).toBe(0)
    })
  })
})
