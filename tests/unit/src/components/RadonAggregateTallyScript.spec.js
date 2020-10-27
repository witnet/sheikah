import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript'

describe('RadonAggregateTallyScript.vue', () => {
  describe('should render correctly when the type is filters', () => {
    const wrapper = mount(RadonAggregateTallyScript, {
      propsData: {
        type: 'filters',
        header: 'a',
        footer: 'b',
        scriptId: 4,
        headerScriptInfo: 'headerScriptInfo',
        footerScriptInfo: 'footerScriptInfo',
        script: {
          filters: [
            {
              hierarchicalType: 'operator',
              id: 5,
              label: 'deviationAbsolute',
              markupType: 'select',
              options: [
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationAbsolute',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationRelative',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationStandard',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'mode',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
              ],
              outputType: 'filterOutput',
              scriptId: 4,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 6,
                    label: 'by',
                    markupType: 'input',
                    value: '1',
                  },
                ],
                description: 'description',
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationAbsolute',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 7,
              label: 'deviationStandard',
              markupType: 'select',
              options: [
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationAbsolute',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationRelative',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationStandard',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'mode',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
              ],
              outputType: 'filterOutput',
              scriptId: 4,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 8,
                    label: 'by',
                    markupType: 'input',
                    value: 1,
                  },
                ],
                description: 'description',
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationStandard',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
          ],
          reducer: {
            hierarchicalType: 'operator',
            id: 9,
            label: 'averageMean',
            markupType: 'select',
            options: [
              {
                hierarchicalType: 'operatorOption',
                label: 'mode',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMean',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMeanWeighted',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMedian',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMedianWeighted',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            ],
            outputType: 'filterOutput',
            scriptId: 4,
            selected: {
              description: 'description',
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'averageMean',
              markupType: 'option',
              outputType: 'reducerOutput',
            },
          },
        },
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
          rad: {
            state: {
              currentTemplate: {
                variables: [{}],
              },
            },
          },
        },
      }),
    })

    it('finds the header text', () => {
      expect(wrapper.find('[data-test="header"]').text()).toBe('a')
    })

    it('finds the footer text', () => {
      expect(wrapper.find('[data-test="footer"]').text()).toBe('b')
    })

    it('finds the filter operator', () => {
      expect(wrapper.find('[data-test="filter-operator"]').exists()).toBe(true)
    })

    it('finds the add operator button', () => {
      expect(wrapper.find('[data-test="reducer-operator"]').exists()).toBe(
        false,
      )
    })
  })

  describe('should render correctly', () => {
    const wrapper = mount(RadonAggregateTallyScript, {
      propsData: {
        type: 'reducer',
        header: 'c',
        footer: 'd',
        scriptId: 4,
        headerScriptInfo: 'headerScriptInfo',
        footerScriptInfo: 'footerScriptInfo',
        script: {
          filters: [
            {
              hierarchicalType: 'operator',
              id: 5,
              label: 'deviationAbsolute',
              markupType: 'select',
              options: [
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationAbsolute',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationRelative',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationStandard',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'mode',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
              ],
              outputType: 'filterOutput',
              scriptId: 4,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 6,
                    label: 'by',
                    markupType: 'input',
                    value: '1',
                  },
                ],
                description: 'description',
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationAbsolute',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 7,
              label: 'deviationStandard',
              markupType: 'select',
              options: [
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationAbsolute',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationRelative',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'deviationStandard',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
                {
                  hierarchicalType: 'operatorOption',
                  label: 'mode',
                  markupType: 'option',
                  outputType: 'filterOutput',
                },
              ],
              outputType: 'filterOutput',
              scriptId: 4,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 8,
                    label: 'by',
                    markupType: 'input',
                    value: 1,
                  },
                ],
                description: 'description',
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationStandard',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
          ],
          reducer: {
            hierarchicalType: 'operator',
            id: 9,
            label: 'averageMean',
            markupType: 'select',
            options: [
              {
                hierarchicalType: 'operatorOption',
                label: 'mode',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMean',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMeanWeighted',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMedian',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'averageMedianWeighted',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            ],
            outputType: 'filterOutput',
            scriptId: 4,
            selected: {
              description: 'description',
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'averageMean',
              markupType: 'option',
              outputType: 'reducerOutput',
            },
          },
        },
      },
      ...createComponentMocks({
        store: {
          uiInteractions: {
            state: {
              generateRadRequestResultLoading: false,
            },
          },
          rad: {
            state: {
              currentTemplate: {
                variables: [{}],
              },
            },
          },
        },
      }),
    })

    it('finds the header text', () => {
      expect(wrapper.find('[data-test="header"]').text()).toBe('c')
    })

    it('finds the footer text', () => {
      expect(wrapper.find('[data-test="footer"]').text()).toBe('d')
    })

    it('finds the filter operator', () => {
      expect(wrapper.find('[data-test="filter-operator"]').exists()).toBe(false)
    })

    it('finds the add operator button', () => {
      expect(wrapper.find('[data-test="reducer-operator"]').exists()).toBe(true)
    })
  })
})
