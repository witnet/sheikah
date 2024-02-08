import RadonAggregateTallyScript from '@/components/RadonAggregateTallyScript.vue'

describe('RadonAggregateTallyScript.vue', () => {
  describe('should render correctly when the type is filters', () => {
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            theme: 'light',
          },
        },
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
      stubs: {
        CustomIcon: true,
        OperatorOutput: true,
        ScriptInfo: true,
        RadonOperator: true,
      },
    })
    const wrapper = mount(RadonAggregateTallyScript, {
      ...mockStore,
      props: {
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
    })

    test('finds the header text', () => {
      expect(wrapper.find('[data-test="header"]').text()).toBe('a')
    })

    test('finds the footer text', () => {
      expect(wrapper.find('[data-test="footer"]').text()).toBe('b')
    })

    test('finds the filter operator', () => {
      expect(wrapper.find('[data-test="filter-operator"]').exists()).toBe(true)
    })

    test('finds the add operator button', () => {
      expect(wrapper.find('[data-test="reducer-operator"]').exists()).toBe(
        false,
      )
    })
  })

  describe('should render correctly', () => {
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            theme: 'light',
          },
        },
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
      stubs: {
        CustomIcon: true,
        OperatorOutput: true,
        ScriptInfo: true,
        RadonOperator: true,
      },
    })
    const wrapper = mount(RadonAggregateTallyScript, {
      ...mockStore,
      props: {
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
    })

    test('finds the header text', () => {
      expect(wrapper.find('[data-test="header"]').text()).toBe('c')
    })

    test('finds the footer text', () => {
      expect(wrapper.find('[data-test="footer"]').text()).toBe('d')
    })

    test('finds the filter operator', () => {
      expect(wrapper.find('[data-test="filter-operator"]').exists()).toBe(false)
    })

    test('finds the add operator button', () => {
      expect(wrapper.find('[data-test="reducer-operator"]').exists()).toBe(true)
    })
  })
})
