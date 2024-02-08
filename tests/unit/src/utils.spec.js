import { Radon } from 'witnet-radon-js'
import { describe, expect, test } from 'vitest'
import {
  areSoftEqualArrays,
  deleteKey,
  getDomainFromUrl,
  standardizeWitUnits,
  standardizeTransactionResult,
  calculateCurrentFocusAfterUndo,
  calculateCurrentFocusAfterRedo,
  simplifyDrResult,
  encodeAggregationTally,
} from '@/utils'
import { WIT_UNIT } from '@/constants'

describe('areSoftEqualArrays', () => {
  test('check if two sorted arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 5]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  test('check if two unsorted arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 2]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(true)
  })

  test('check if two different arrays contains the same items', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [1, 2, 3, 4, 6]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  test('check if two different arrays with repeated items contains the same items', () => {
    const arr1 = [1, 3, 5, 4, 5]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })

  test('check if two different sized arrays contains the same items', () => {
    const arr1 = [1, 3, 5, 4]
    const arr2 = [5, 2, 3, 4, 1]
    expect(areSoftEqualArrays(arr1, arr2)).toBe(false)
  })
})

describe('standardizeTransactionResult', () => {
  test('should end with "ago" copy', () => {
    const result =
      'RadonTypes::RadonString("0000000000000000000a55ab43b096575bf281f35d68807c52a0202582c15947")'
    const expected =
      'RadonString("0000000000000000000a55ab43b096575bf281f35d68807c52a0202582c15947")'

    expect(standardizeTransactionResult(result)).toBe(expected)
  })
})

describe('getDomainFromUrl', () => {
  test('should work url with protocol', () => {
    const url = 'http://WITnet.io'

    expect(getDomainFromUrl(url)).toBe('WITnet.io')
  })

  test('should work without protocol', () => {
    const url = 'WITnet.io'

    expect(getDomainFromUrl(url)).toBe('WITnet.io')
  })

  test('should work with subdomain', () => {
    const url = 'http://docs.WITnet.io'

    expect(getDomainFromUrl(url)).toBe('docs.WITnet.io')
  })

  test('should NOT work without tld', () => {
    const url = 'http://WITnet'

    expect(getDomainFromUrl(url)).toBe('')
  })

  test('should NOT work with invalid tld', () => {
    const url = 'http://WITnet.abcdefghij'

    expect(getDomainFromUrl(url)).toBe('')
  })
})

describe('simplifyDrResult', () => {
  test('with object', () => {
    const drResult = {
      RadonMap: {
        AUD: {
          RadonMap: {
            '15m': {
              RadonFloat: 16135.65,
            },
            buy: {
              RadonFloat: 16135.65,
            },
            last: {
              RadonFloat: 16135.65,
            },
            sell: {
              RadonFloat: 16135.65,
            },
            symbol: {
              RadonString: '$',
            },
          },
        },
      },
    }

    const drResultSimplified = {
      AUD: {
        '15m': 'Float(16135.65)',
        buy: 'Float(16135.65)',
        last: 'Float(16135.65)',
        sell: 'Float(16135.65)',
        symbol: 'String($)',
      },
    }

    expect(drResultSimplified).toStrictEqual(simplifyDrResult(drResult))
  })

  test('with array', () => {
    const drResult = [
      {
        RadonMap: {
          AUD: {
            RadonMap: {
              '15m': {
                RadonFloat: 16135.65,
              },
              buy: {
                RadonFloat: 16135.65,
              },
              last: {
                RadonFloat: 16135.65,
              },
              sell: {
                RadonFloat: 16135.65,
              },
              symbol: {
                RadonString: '$',
              },
            },
          },
        },
      },
      {
        RadonMap: {
          AUD: {
            RadonMap: {
              '15m': {
                RadonFloat: 16135.65,
              },
              buy: {
                RadonFloat: 16135.65,
              },
              last: {
                RadonFloat: 16135.65,
              },
              sell: {
                RadonFloat: 16135.65,
              },
              symbol: {
                RadonString: '$',
              },
            },
          },
        },
      },
    ]

    const drResultSimplified = [
      {
        AUD: {
          '15m': 'Float(16135.65)',
          buy: 'Float(16135.65)',
          last: 'Float(16135.65)',
          sell: 'Float(16135.65)',
          symbol: 'String($)',
        },
      },
      {
        AUD: {
          '15m': 'Float(16135.65)',
          buy: 'Float(16135.65)',
          last: 'Float(16135.65)',
          sell: 'Float(16135.65)',
          symbol: 'String($)',
        },
      },
    ]

    expect(drResultSimplified).toStrictEqual(simplifyDrResult(drResult))
  })
})

describe('standardizeWitUnits', () => {
  describe('return the value in selected untest', () => {
    describe('WIT', () => {
      describe('to WIT', () => {
        test('with decimal', () => {
          const expected = '0.00004'

          const result = standardizeWitUnits(
            '0.00004',
            WIT_UNIT.WIT,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '1.00'

          const result = standardizeWitUnits('1', WIT_UNIT.WIT, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })
      })

      describe('to microWIT', () => {
        test('with decimal', () => {
          const expected = '400000.00'

          const result = standardizeWitUnits(
            '0.4',
            WIT_UNIT.MICRO,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '400000.00'

          const result = standardizeWitUnits(
            '0.4',
            WIT_UNIT.MICRO,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to nanoWIT', () => {
        test('with decimal', () => {
          const expected = '100000000'

          const result = standardizeWitUnits('0.1', WIT_UNIT.NANO, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '1000000000'

          const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })
      })
    })

    describe('microWIT', () => {
      describe('to WIT', () => {
        test('with decimal', () => {
          const expected = '0.0000011'

          const result = standardizeWitUnits(
            '1.1',
            WIT_UNIT.WIT,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '1.00'

          const result = standardizeWitUnits(
            '1000000',
            WIT_UNIT.WIT,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to microWIT', () => {
        test('with decimal', () => {
          const expected = '0.1'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.MICRO,
            WIT_UNIT.MICRO,
            5,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '1.00'

          const result = standardizeWitUnits(
            '1',
            WIT_UNIT.MICRO,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to nanoWIT', () => {
        test('with decimal', () => {
          const expected = '100'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.NANO,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '1000'

          const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.MICRO)

          expect(result).toBe(expected)
        })
      })
    })

    describe('nanoWIT', () => {
      describe('to WIT', () => {
        test('without decimal', () => {
          const expected = '0.000000001'

          const result = standardizeWitUnits('1', WIT_UNIT.WIT, WIT_UNIT.NANO)

          expect(result).toBe(expected)
        })
      })

      describe('to microWIT', () => {
        test('with decimal', () => {
          const expected = '0.0001'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.MICRO,
            WIT_UNIT.NANO,
          )

          expect(result).toBe(expected)
        })

        test('without decimal', () => {
          const expected = '0.001'

          const result = standardizeWitUnits('1', WIT_UNIT.MICRO, WIT_UNIT.NANO)

          expect(result).toBe(expected)
        })
      })

      test('to nanoWIT', () => {
        const expected = '1'

        const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.NANO)

        expect(result).toBe(expected)
      })
    })
  })
})

describe('deleteKey', () => {
  test('delete if the key is found', () => {
    const result = deleteKey({ a: 'a', b: 'b', c: 'c' }, 'b')
    const expected = { a: 'a', c: 'c' }

    expect(result).toStrictEqual(expected)
  })

  test('should not change if key is not found', () => {
    const entry = { a: 'a', b: 'b', c: 'c' }
    const result = deleteKey(entry, 'd')
    const expected = { a: 'a', b: 'b', c: 'c' }

    expect(result).toStrictEqual(expected)
  })

  test('should not mutate the object', () => {
    const entry = { a: 'a', b: 'b', c: 'c' }

    deleteKey(entry, 'b')

    expect(entry).toStrictEqual({ a: 'a', b: 'b', c: 'c' })
  })
})

describe('calculateCurrentFocusAfterUndo', () => {
  describe('should work for all HISTORY_UPDATE_TYPEs', () => {
    describe('DELETE_OPERATOR', () => {
      test('on retrieve stage', () => {
        const historyCheckpoint = {
          type: 'DELETE_OPERATOR',
          scriptId: 2,
          operatorid: 3,
        }

        const mir = {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        }
        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe('void')
      })

      test('on aggragation or tally stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [],
              },
            ],
            aggregate: {
              filters: [
                [5, 1],
                [5, 1],
              ],
              reducer: 2,
            },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'aggregations',
          type: 'PUSH_OPERATOR',
          scriptId: 3,
        }

        const mir = {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
          ],
          aggregate: {
            filters: [
              [5, 1],
              [5, 1],
            ],
            reducer: 2,
          },
          tally: { filters: [], reducer: 2 },
        }
        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe(6)
      })
    })
    describe('PUSH_OPERATOR', () => {
      test('on retrieve stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [],
              },
            ],
            aggregate: { filters: [], reducer: 2 },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'settings',
        }
        const mir = {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [112],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        }
        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe(undefined)
      })
    })

    test('DELETE_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'ADD_SOURCE',
      }
      const mir = {
        timelock: 0,
        retrieve: [
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(0)
    })

    test('ADD_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [112],
            },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'ADD_SOURCE',
      }
      const mir = {
        timelock: 0,
        retrieve: [
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [112] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }
      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(1)
    })

    test('UPDATE_TEMPLATE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: 'asd',
              contentType: 'JSON API',
              script: [112, 32],
            },
            {
              kind: 'HTTP-GET',
              url: 'asd',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'scripts',
        type: 'PUSH_OPERATOR',
        scriptId: 2,
      }
      const mir = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'asd',
            contentType: 'JSON API',
            script: [112, 34],
          },
          {
            kind: 'HTTP-GET',
            url: 'asd',
            contentType: 'JSON API',
            script: [114],
          },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(4)
    })

    test('UPDATE_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: 'asd',
              contentType: 'JSON API',
              script: [],
            },
            {
              kind: 'HTTP-GET',
              url: 'asd',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'UPDATE_SOURCE',
        index: 0,
        source: { protocol: 'HTTP-GET', url: 'asd' },
      }
      const mir = {
        timelock: 0,
        retrieve: [
          { kind: 'HTTP-GET', url: 'asd', contentType: 'JSON API', script: [] },
          {
            kind: 'HTTP-GET',
            url: 'asd',
            contentType: 'JSON API',
            script: [114],
          },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(0)
    })
    // test('UPDATE_VARIABLE', () => {})
    // test('ADD_VARIABLE', () => {})
    // test('DELETE_VARIABLE', () => {})
  })
})

describe('calculateCurrentFocusAfterRedo', () => {
  describe('should work for all HISTORY_UPDATE_TYPEs', () => {
    describe('DELETE_OPERATOR', () => {
      test('on retrieve stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [112],
              },
            ],
            aggregate: { filters: [], reducer: 2 },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'scripts',
          type: 'PUSH_OPERATOR',
          scriptId: 2,
        }
        const mir = {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        }

        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterRedo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe('void')
      })

      test('on aggragation or tally stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [],
              },
            ],
            aggregate: { filters: [], reducer: 2 },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'aggregations',
          type: 'DELETE_OPERATOR',
          scriptId: 3,
          operatorId: 7,
        }
        const mir = {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
          ],
          aggregate: { filters: [[5, 1]], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        }

        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe(4)
      })
    })

    describe('PUSH_OPERATOR', () => {
      test('on retrieve stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [112, 34, 16, 64],
              },
            ],
            aggregate: { filters: [], reducer: 2 },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'scripts',
          type: 'PUSH_OPERATOR',
          scriptId: 2,
        }
        const mir = {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [112, 34, 16],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        }
        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe(5)
      })

      test('on aggregation tally stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [112, 34, 16, 64],
              },
            ],
            aggregate: {
              filters: [
                [5, 1],
                [5, 1],
                [5, 1],
              ],
              reducer: 2,
            },
            tally: { filters: [], reducer: 2 },
          },
          stage: 'aggregations',
          type: 'PUSH_OPERATOR',
          scriptId: 9,
        }
        const mir = {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [112, 34, 16, 64],
            },
          ],
          aggregate: {
            filters: [
              [5, 1],
              [5, 1],
            ],
            reducer: 2,
          },
          tally: { filters: [], reducer: 2 },
        }

        const markup = new Radon(mir).getMarkup()
        const variables = {}
        const id = calculateCurrentFocusAfterUndo(
          historyCheckpoint,
          markup,
          variables,
        )

        expect(id).toBe(10)
      })
    })

    test('DELETE_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'DELETE_SOURCE',
        index: 5,
      }
      const mir = {
        timelock: 0,
        retrieve: [
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(5)
    })

    test('ADD_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'ADD_SOURCE',
      }
      const mir = {
        timelock: 0,
        retrieve: [
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [] },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }
      const markup = new Radon(mir).getMarkup()

      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(0)
    })

    test('UPDATE_TEMPLATE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [112, 34],
            },
            {
              kind: 'HTTP-GET',
              url: '',
              contentType: 'JSON API',
              script: [114],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'scripts',
        type: 'UPDATE_TEMPLATE',
        id: 11,
        value: 'BooleanNegate',
      }

      const mir = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: '',
            contentType: 'JSON API',
            script: [112, 34],
          },
          { kind: 'HTTP-GET', url: '', contentType: 'JSON API', script: [114] },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(11)
    })

    test('UPDATE_SOURCE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: 'aaaaaaa',
              contentType: 'JSON API',
              script: [],
            },
          ],
          aggregate: { filters: [], reducer: 2 },
          tally: { filters: [], reducer: 2 },
        },
        stage: 'sources',
        type: 'UPDATE_SOURCE',
        index: 0,
        source: { protocol: 'HTTP-GET', url: 'aaaaaaa' },
      }
      const mir = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'aaaaaa',
            contentType: 'JSON API',
            script: [],
          },
        ],
        aggregate: { filters: [], reducer: 2 },
        tally: { filters: [], reducer: 2 },
      }

      const markup = new Radon(mir).getMarkup()
      const variables = {}
      const id = calculateCurrentFocusAfterUndo(
        historyCheckpoint,
        markup,
        variables,
      )

      expect(id).toBe(0)
    })

    // test('UPDATE_VARIABLE', () => {})
    // test('ADD_VARIABLE', () => {})
    // test('DELETE_VARIABLE', () => {})
  })
})

describe('encodeAggregationTally', () => {
  test('without filter argument', () => {
    const expected = {
      filters: [
        {
          args: [],
          op: 8,
        },
      ],
      reducer: 3,
    }

    const result = encodeAggregationTally({
      filters: [[8]],
      reducer: 3,
    })

    expect(result).toStrictEqual(expected)
  })

  test('with a single filter argument', () => {
    const expected = {
      filters: [
        {
          args: [251, 63, 185, 153, 153, 153, 153, 153, 154],
          op: 5,
        },
      ],
      reducer: 3,
    }

    const result = encodeAggregationTally({
      filters: [[5, '0.1']],
      reducer: 3,
    })

    expect(result).toStrictEqual(expected)
  })
})
