import { shallowMount } from '@vue/test-utils'
import RadonOperator from '@/components/RadonOperator.vue'

describe('RadonOperator.vue', () => {
  const filterArgumentOptions = [
    { value: 0, text: 'GT' },
    { value: 1, text: 'LT' },
    { value: 2, text: 'EQ' },
    { value: 3, text: 'DEVABS' },
    { value: 4, text: 'DEVREL' },
    { value: 5, text: 'DEVSTD' },
    { value: 6, text: 'TOP' },
    { value: 7, text: 'BOTTOM' },
    { value: 8, text: 'NOTGT' },
    { value: 9, text: 'NOTLT' },
    { value: 10, text: 'NOTEQ' },
    { value: 11, text: 'NOTDEVABS' },
    { value: 12, text: 'NOTDEVREL' },
    { value: 13, text: 'NOTDEVSTD' },
    { value: 14, text: 'NOTTOP' },
    { value: 15, text: 'NOTBOTTOM' },
  ]

  const reduceArgumentOptions = [
    { value: 0, text: 'MIN' },
    { value: 1, text: 'MAX' },
    { value: 2, text: 'MODE' },
    { value: 3, text: 'AVGMEAN' },
    { value: 4, text: 'AVGMEANW' },
    { value: 5, text: 'AVGMEDIAN' },
    { value: 6, text: 'AVGMEDIANW' },
    { value: 7, text: 'DEVSTD' },
    { value: 8, text: 'DEVAVG' },
    { value: 9, text: 'DEVMED' },
    { value: 10, text: 'DEVMAX' },
  ]

  describe('ArrayCount operator', () => {
    const operator = 0x50
    const wrapper = shallowMount(RadonOperator, {
      propsData: { radOperator: operator },
    })

    it('select has operator code value', () => {
      expect(wrapper.find('select').element.value).toBe(operator.toString())
    })

    it('has no arguments', () => {
      expect(wrapper.find('.arguments').exists()).toBe(false)
    })
  })

  describe('ArrayEvery operator', () => {
    const operator = [0x51, [0x00, 1]]
    const wrapper = shallowMount(RadonOperator, {
      propsData: { radOperator: operator },
    })

    it('select has operator code value', () => {
      expect(wrapper.find('select').element.value).toBe(operator[0].toString())
    })

    it('has arguments', () => {
      expect(wrapper.find('.arguments').exists()).toBe(true)
    })

    it('select options have the correct value ', () => {
      filterArgumentOptions.map((argumentOption, index) => {
        expect(wrapper.find('.arguments').findAll('option').at(index).element.value).toBe(argumentOption.value.toString())
      })
    })

    it('select options have the correct content', () => {
      filterArgumentOptions.map((argumentOption, index) => {
        expect(wrapper.find('.arguments').findAll('option').at(index).element.textContent.trim()).toBe(argumentOption.text)
      })
    })

    it('argument input has the correct value', () => {
      expect(wrapper.find('.arguments').find('input').element.value).toBe(operator[1][1].toString())
    })
  })

  describe('ArrayFilter operator', () => {
    // TODO(#645)
  })

  describe('ArratFlatten operator', () => {
    // TODO(#646)
  })
  describe('ArrayGet operator', () => {
    // TODO(#647)
  })

  describe('ArrayMap operator', () => {
    // TODO(#648)
  })

  describe('ArrayReduce operator', () => {
    // TODO(#649)
    const operator = [0x56, 0]
    const wrapper = shallowMount(RadonOperator, {
      propsData: { radOperator: operator },
    })

    it('select has operator code value', () => {
      expect(wrapper.find('select').element.value).toBe(operator[0].toString())
    })

    it('has arguments', () => {
      expect(wrapper.find('.arguments').exists()).toBe(true)
    })

    it('select options have the correct value ', () => {
      reduceArgumentOptions.map((argumentOption, index) => {
        expect(wrapper.find('.arguments').findAll('option').at(index).element.value).toBe(argumentOption.value.toString())
      })
    })

    it('select options have the correct content', () => {
      reduceArgumentOptions.map((argumentOption, index) => {
        expect(wrapper.find('.arguments').findAll('option').at(index).element.textContent.trim()).toBe(argumentOption.text)
      })
    })

    it('argument input has the correct value', () => {
      expect(wrapper.find('.arguments').find('select').element.value).toBe(operator[1].toString())
    })
  })

  describe('ArraySome operator', () => {
    // TODO(#650)
  })
  describe('ARRAY_SORT', () => {
    // TODO(#651)
  })
  describe('ARRAY_TAKE', () => {
    // TODO(#652)
  })
  describe('BOOLEAN_MATCH', () => {
    // TODO(#653)
  })
  describe('BOOLEAN_NEG', () => {
    // TODO(#654)
  })
  describe('BOOLEAN_TOSTRING', () => {
    // TODO(#655)
  })
  describe('INT_ABS', () => {
    // TODO(#656)
  })
  describe('INT_MATCH', () => {
    // TODO(#657)
  })
  describe('INT_MODULO', () => {
    // TODO(#658)
  })
  describe('INT_MULT', () => {
    // TODO(#659)
  })
  describe('INT_NEG', () => {
    // TODO(#660)
  })
  describe('INT_POW', () => {
    // TODO(#661)
  })
  describe('INT_RECIP', () => {
    // TODO(#662)
  })
  describe('INT_SUM', () => {
    // TODO(#663)
  })
  describe('INT_TOFLOAT', () => {
    // TODO(#664)
  })
  describe('INT_TOSTRING', () => {
    // TODO(#665)
  })
  describe('FLOAT_ABS', () => {
    // TODO(#666)
  })
  describe('FLOAT_CEIL', () => {
    // TODO(#667)
  })
  describe('FLOAT_FLOOR', () => {
    // TODO(#668)
  })
  describe('FLOAT_MODULO', () => {
    // TODO(#669)
  })
  describe('FLOAT_MULT', () => {
    // TODO(#670)
  })
  describe('FLOAT_NEG', () => {
    // TODO(#671)
  })
  describe('FLOAT_POW', () => {
    // TODO(#672)
  })
  describe('FLOAT_RECIP', () => {
    // TODO(#673)
  })
  describe('FLOAT_ROUND', () => {
    // TODO(#674)
  })
  describe('FLOAT_SUM', () => {
    // TODO(#675)
  })
  describe('FLOAT_TOSTRING', () => {
    // TODO(#676)
  })
  describe('FLOAT_TRUNC', () => {
    // TODO(#677)
  })
  describe('STRING_HASH', () => {
    // TODO(#678)
  })
  describe('STRING_LENGTH', () => {
    // TODO(#679)
  })
  describe('STRING_CATEGORIZE', () => {
    // TODO(#680)
  })
  describe('STRING_PARSEJSON', () => {
    // TODO(#681)
  })
  describe('STRING_PARSEXML', () => {
    // TODO(#682)
  })
  describe('STRING_TOBOOLEAN', () => {
    // TODO(#683)
  })
  describe('STRING_TOFLOAT', () => {
    // TODO(#684)
  })
  describe('STRING_TOINT', () => {
    // TODO(#685)
  })
  describe('STRING_TOLOWERCASE', () => {
    // TODO(#686)
  })
  describe('STRING_TOUPPERCASE', () => {
    // TODO(#687)
  })
  describe('MAP_ENTRIES', () => {
    // TODO(#688)
  })
  describe('MAP_GET', () => {
    // TODO(#689)
  })
  describe('MAP_KEYS', () => {
    // TODO(#690)
  })
  describe('MAP_VALUES', () => {
    // TODO(#691)
  })
  describe('MIXED_TOARRAY', () => {
    // TODO(#692)
  })
  describe('MIXED_TOBOOLEAN', () => {
    // TODO(#693)
  })
  describe('MIXED_TOFLOAT', () => {
    // TODO(#694)
  })
  describe.only('MIXED_TOINT', () => {
    const operator = [115, 0]
    const wrapper = shallowMount(RadonOperator, {
      propsData: { radOperator: operator },
    })

    it('select has operator code value', () => {
      expect(wrapper.find('select').element.value).toBe(operator[0].toString())
    })

    it('has arguments', () => {
      expect(wrapper.find('.arguments').exists()).toBe(true)
    })

    it('argument input has the correct value', () => {
      expect(wrapper.find('.arguments').find('input').element.value).toBe(operator[1].toString())
    })
  })
  describe('MIXED_TOMAP', () => {
    // TODO(#696)
  })
  describe('RESULT_GET', () => {
    // TODO(#697)
  })
  describe('RESULT_GETOR', () => {
    // TODO(#698)
  })
  describe('RESULT_ISOK', () => {
    // TODO(#699)
  })
})
