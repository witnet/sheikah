import { standardizeOperatorName } from '../../src/utils'

describe('standardizeOperatorName', () => {
  it('works when no argument is provided', () => {
    const name = null
    const result = standardizeOperatorName(name)
    expect(result).toBeUndefined()
  })
  it('split first work of the camelCase string', () => {
    const name = 'StringInCapitalLeter'
    const result = standardizeOperatorName(name)
    expect(result).toEqual('inCapitalLeter')
  })
  it('returns the word if the string has only one word', () => {
    const name = 'String'
    const result = standardizeOperatorName(name)
    expect(result).toEqual('string')
  })
})
