import BigNumber from '@/utils/BigNumber'

describe('BigNumber', () => {
  describe('should return the correct result when operating big numbers', () => {
    it('should return the correct result of the sum', () => {
      const number = '9007199254740999'
      const bigNumber = new BigNumber(number)

      const result = bigNumber.plus('1')

      expect(result.toString()).toBe('9007199254741000')
    })

    it('should return the correct result of the multiplication', () => {
      const number = '9007199254740999'
      const bigNumber = new BigNumber(number)

      const result = bigNumber.times('10')

      expect(result.toString()).toBe('90071992547409990')
    })

    it('should return the correct result of raising to a power', () => {
      const number = '25'
      const bigNumber = new BigNumber(number)

      const exponent = new BigNumber(10).pow(17)
      const result = bigNumber.times(exponent)

      expect(result.toString()).toBe('2500000000000000000')
    })
  })
})
