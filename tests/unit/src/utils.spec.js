import {
  areSoftEqualArrays,
  calculateTimeAgo,
  deleteKey,
  getDomainFromUrl,
  standardizeWitUnits,
  calculateCurrentFocusAfterUndo,
  calculateCurrentFocusAfterRedo,
  simplifyDrResult,
  groupAmountByUnlockedDate,
} from '@/utils'
import { WIT_UNIT } from '@/constants'
import { Radon } from 'witnet-radon-js'

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

    date.setSeconds(date.getSeconds() - 4)

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

describe('simplifyDrResult', () => {
  it('with object', () => {
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

  it('with array', () => {
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
  describe('return the value in selected currency', () => {
    describe('wit', () => {
      describe('to wit', () => {
        it('with decimal', () => {
          const expected = '0.00004'

          const result = standardizeWitUnits(
            '0.00004',
            WIT_UNIT.WIT,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })

        it('with truncated decimal', () => {
          const expected = '1.10'

          const result = standardizeWitUnits(
            '1.10002',
            WIT_UNIT.WIT,
            WIT_UNIT.WIT,
            2,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '1'

          const result = standardizeWitUnits('1', WIT_UNIT.WIT, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })
      })

      describe('to microWit', () => {
        it('with decimal', () => {
          const expected = '400000'

          const result = standardizeWitUnits(
            '0.4',
            WIT_UNIT.MICRO,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '400000'

          const result = standardizeWitUnits(
            '0.4',
            WIT_UNIT.MICRO,
            WIT_UNIT.WIT,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to nanoWit', () => {
        it('with decimal', () => {
          const expected = '100000000'

          const result = standardizeWitUnits('0.1', WIT_UNIT.NANO, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })
        it('without decimal', () => {
          const expected = '1000000000'

          const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.WIT)

          expect(result).toBe(expected)
        })
      })
    })

    describe('microWit', () => {
      describe('to wit', () => {
        it('with decimal', () => {
          const expected = '0.0000011'

          const result = standardizeWitUnits(
            '1.1',
            WIT_UNIT.WIT,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })

        it('with truncated decimal', () => {
          const expected = '0.0000'

          const result = standardizeWitUnits(
            '1.0000001',
            WIT_UNIT.WIT,
            WIT_UNIT.MICRO,
            4,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '1'

          const result = standardizeWitUnits(
            '1000000',
            WIT_UNIT.WIT,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to microWit', () => {
        it('with decimal', () => {
          const expected = '0.10000'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.MICRO,
            WIT_UNIT.MICRO,
            5,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '1'

          const result = standardizeWitUnits(
            '1',
            WIT_UNIT.MICRO,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })
      })

      describe('to nanoWit', () => {
        it('with decimal', () => {
          const expected = '100'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.NANO,
            WIT_UNIT.MICRO,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '1000'

          const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.MICRO)

          expect(result).toBe(expected)
        })
      })
    })

    describe('nanoWit', () => {
      describe('to wit', () => {
        it('without decimal', () => {
          const expected = '0.000000001'

          const result = standardizeWitUnits('1', WIT_UNIT.WIT, WIT_UNIT.NANO)

          expect(result).toBe(expected)
        })
      })

      describe('to microWit', () => {
        it('with decimal', () => {
          const expected = '0.0001'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.MICRO,
            WIT_UNIT.NANO,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '0.001'

          const result = standardizeWitUnits('1', WIT_UNIT.MICRO, WIT_UNIT.NANO)

          expect(result).toBe(expected)
        })
      })

      describe('to nanoWit', () => {
        it('with decimal', () => {
          const expected = '0.1'

          const result = standardizeWitUnits(
            '0.1',
            WIT_UNIT.NANO,
            WIT_UNIT.NANO,
          )

          expect(result).toBe(expected)
        })

        it('without decimal', () => {
          const expected = '1'

          const result = standardizeWitUnits('1', WIT_UNIT.NANO, WIT_UNIT.NANO)

          expect(result).toBe(expected)
        })
      })
    })
  })
})

describe('deleteKey', () => {
  it('delete if the key is found', () => {
    const result = deleteKey({ a: 'a', b: 'b', c: 'c' }, 'b')
    const expected = { a: 'a', c: 'c' }

    expect(result).toStrictEqual(expected)
  })

  it('should not change if key is not found', () => {
    const entry = { a: 'a', b: 'b', c: 'c' }
    const result = deleteKey(entry, 'd')
    const expected = { a: 'a', b: 'b', c: 'c' }

    expect(result).toStrictEqual(expected)
  })

  it('should not mutate the object', () => {
    const entry = { a: 'a', b: 'b', c: 'c' }

    deleteKey(entry, 'b')

    expect(entry).toStrictEqual({ a: 'a', b: 'b', c: 'c' })
  })
})

describe('calculateCurrentFocusAfterUndo', () => {
  describe('should work for all HISTORY_UPDATE_TYPEs', () => {
    describe('DELETE_OPERATOR', () => {
      it('on retrieve stage', () => {
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
      it('on aggragation or tally stage', () => {
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
                [3, 1],
                [3, 1],
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
              [3, 1],
              [3, 1],
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
      it('on retrieve stage', () => {
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

    it('DELETE_SOURCE', () => {
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

    it('ADD_SOURCE', () => {
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

    it('UPDATE_TEMPLATE', () => {
      const historyCheckpoint = {
        rad: {
          timelock: 0,
          retrieve: [
            {
              kind: 'HTTP-GET',
              url: 'asd',
              contentType: 'JSON API',
              script: [112, [33, '', true]],
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

    it('UPDATE_SOURCE', () => {
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
    // it('UPDATE_VARIABLE', () => {})
    // it('ADD_VARIABLE', () => {})
    // it('DELETE_VARIABLE', () => {})
  })
})

describe('calculateCurrentFocusAfterRedo', () => {
  describe('should work for all HISTORY_UPDATE_TYPEs', () => {
    describe('DELETE_OPERATOR', () => {
      it('on retrieve stage', () => {
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

      it('on aggragation or tally stage', () => {
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
          aggregate: { filters: [[3, 1]], reducer: 2 },
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
      it('on retrieve stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [112, [33, '', true], 16, 64],
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
              script: [112, [33, '', true], 16],
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

        expect(id).toBe(7)
      })

      it('on aggregation tally stage', () => {
        const historyCheckpoint = {
          rad: {
            timelock: 0,
            retrieve: [
              {
                kind: 'HTTP-GET',
                url: '',
                contentType: 'JSON API',
                script: [112, [33, '', true], 16, 64],
              },
            ],
            aggregate: {
              filters: [
                [3, 1],
                [3, 1],
                [3, 1],
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
              script: [112, [33, '', true], 16, 64],
            },
          ],
          aggregate: {
            filters: [
              [3, 1],
              [3, 1],
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

        expect(id).toBe(12)
      })
    })

    it('DELETE_SOURCE', () => {
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

    it('ADD_SOURCE', () => {
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

    it('UPDATE_TEMPLATE', () => {
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
            script: [112, [33, '', true]],
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

    it('UPDATE_SOURCE', () => {
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

    // it('UPDATE_VARIABLE', () => {})
    // it('ADD_VARIABLE', () => {})
    // it('DELETE_VARIABLE', () => {})
  })
})

describe.only('groupAmountByUnlockedDate', () => {
  describe('amount is equal to address gap', () => {
    it('54321', () => {
      const expected = [8388608]
      const result = groupAmountByUnlockedDate(54321, 2)

      expect(result).toStrictEqual(expected)
    })

    it.only('50 000 000', () => {
      const expected = [33554432, 8388608, 8388608]

      const result = groupAmountByUnlockedDate(50000000, 2)

      expect(result).toStrictEqual(expected)
    })

    it('5 000 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(5000000, 2)

      expect(result).toBe(expected)
    })

    it('500 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(500000, 2).length

      expect(result).toBe(expected)
    })

    it('50 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(50000, 2).length

      expect(result).toBe(expected)
    })

    it('5 000', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(5000, 2).length

      expect(result).toBe(expected)
    })

    it('500', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(500, 2).length

      expect(result).toBe(expected)
    })

    it('50', () => {
      const expected = 1
      const result = groupAmountByUnlockedDate(50, 2).length

      expect(result).toBe(expected)
    })
  })

  it('amount is lower than address minimum', () => {
    const expected = 1
    const result = groupAmountByUnlockedDate(5, 2).length

    expect(result).toBe(expected)
  })

  it('amount is 0', () => {
    const expected = 0
    const result = groupAmountByUnlockedDate(0, 2).length

    expect(result).toBe(expected)
  })

  describe('divide several times', () => {
    it('737 000 000 000', () => {
      const expected = 6
      const result = groupAmountByUnlockedDate(737 * 10 ** 9, 2).length

      expect(result).toBe(expected)
    })

    it('1 000 532 000 000 000', () => {
      const expected = 4
      const result = groupAmountByUnlockedDate(1000533 * 10 ** 9, 2).length

      expect(result).toBe(expected)
    })

    it('2 523 432 000 000 000', () => {
      const expected = 24
      const result = groupAmountByUnlockedDate(2523432 * 10 ** 9, 2).length

      expect(result).toBe(expected)
    })
  })
})
