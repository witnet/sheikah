import { areSoftEqualArrays, standardizeWitUnits, groupAmountByUnlockedDate } from '@/utils'
import { WIT_UNIT } from '../../../src/constants'

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

describe('standardizeWitUnits', () => {
  describe('return the value in selected unit', () => {
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

describe('groupAmountByUnlockedDate', () => {
  describe('amount is equal to address gap', () => {
    it('50 000 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(50000000).length

      expect(result).toBe(expected)
    })

    it('5 000 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(5000000).length

      expect(result).toBe(expected)
    })

    it('500 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(500000).length

      expect(result).toBe(expected)
    })

    it('50 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(50000).length

      expect(result).toBe(expected)
    })

    it('5 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(5000).length

      expect(result).toBe(expected)
    })

    it('500', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(500).length

      expect(result).toBe(expected)
    })

    it('50', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(50).length

      expect(result).toBe(expected)
    })
  })

  it('amount is lower than address minimum', () => {
    const expected = 1
    const result = groupAmountByUnlockedDate(5).length

    expect(result).toBe(expected)
  })

  it('amount is 0', () => {
    const expected = 0
    const result = groupAmountByUnlockedDate(0).length

    expect(result).toBe(expected)
  })

  describe('divide several times', () => {
    it('737', () => {
      const expected = 6
      const result = groupAmountByUnlockedDate(737).length

      expect(result).toBe(expected)
    })

    it('1 000 532', () => {
      const expected = 4
      const result = groupAmountByUnlockedDate(1000532).length

      expect(result).toBe(expected)
    })

    it('2 523 432', () => {
      const expected = 24
      const result = groupAmountByUnlockedDate(2523432).length

      expect(result).toBe(expected)
    })
  })
})
