import {
  areSoftEqualArrays,
  calculateTimeAgo,
  getDomainFromUrl,
  standardizeWitUnits,
} from '@/utils'
import { WIT_UNIT } from '@/constants'

describe('areSoftEqualArrays', () => {
  it('check if two sorted arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 5]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  it('check if two unsorted arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 2]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  it('check if two different arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 6]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  it('check if two different arrays with repeated items contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 5]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  it('check if two different sized arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })
})

describe('calculateTimeAgo', () => {
  it('should end with "ago" copy', () => {
    const date = new Date()

    date.setSeconds(date.getSeconds() - 4);

    expect(calculateTimeAgo(date).endsWith('ago')).toBe(true)
  })

})

describe('getDomainFromUrl', () => {
  it('should work url with protocol', () => {
    const url = 'http://witnet.io'

    expect(getDomainFromUrl(url)).toBe('witnet.io')
  })

  it('should work without protocol', () => {
    const url = 'witnet.io'

    expect(getDomainFromUrl(url)).toBe('witnet.io')
  })

  it('should work with subdomain', () => {
    const url = 'http://docs.witnet.io'

    expect(getDomainFromUrl(url)).toBe('docs.witnet.io')
  })

  it('should NOT work without tld', () => {
    const url = 'http://witnet'

    expect(getDomainFromUrl(url)).toBe('')
  })

  it('should NOT work with invalid tld', () => {
    const url = 'http://witnet.abcdefghij'

    expect(getDomainFromUrl(url)).toBe('')
  })
})

describe('standardizeWitUnits', () => {
  describe('return the value in selected currency', () => {
    describe('wit', () => {
      it("without trim 0's", () => {
        const expected = '0.000000004'
        const result = standardizeWitUnits(4, WIT_UNIT.WIT)
        expect(result).toBe(expected)
      })

      it("trim 0's", () => {
        const expected = '0.0000004'
        const result = standardizeWitUnits(400, WIT_UNIT.WIT)
        expect(result).toBe(expected)
      })
    })

    describe('microWit', () => {
      it("without trim 0's", () => {
        const expected = '0.004'
        const result = standardizeWitUnits(4, WIT_UNIT.MICRO)
        expect(result).toBe(expected)
      })

      it("trim 0's", () => {
        const expected = '0.4'
        const result = standardizeWitUnits(400, WIT_UNIT.MICRO)
        expect(result).toBe(expected)
      })
    })

    it('nanoWit', () => {
      const expected = '40'
      const result = standardizeWitUnits(40, WIT_UNIT.NANO)
      expect(result).toBe(expected)
    })
  })
})
