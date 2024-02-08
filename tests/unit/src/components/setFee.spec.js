import SetFee from '@/components/SendTransaction/SetFee.vue'
import SelectEstimatedFee from '@/components/SendTransaction/SelectEstimatedFee.vue'
import { DEFAULT_VTT_VALUES, DEFAULT_LOCALE } from '@/constants'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMocks } from '../../utils'
import { ElButton, ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus'

const FEE_ESTIMATION_REPORT_MOCK = {
  report: {
    drt_high: { priority: 0.4, time_to_block: 300 },
    drt_low: { priority: 0.2, time_to_block: 3600 },
    drt_medium: { priority: 0.3, time_to_block: 900 },
    drt_opulent: { priority: 0.5, time_to_block: 60 },
    drt_stinky: { priority: 0.1, time_to_block: 21600 },
    vtt_high: { priority: 0.4, time_to_block: 300 },
    vtt_low: { priority: 0.2, time_to_block: 3600 },
    vtt_medium: { priority: 0.3, time_to_block: 900 },
    vtt_opulent: { priority: 0.5, time_to_block: 60 },
    vtt_stinky: { priority: 0.1, time_to_block: 21600 },
  },
}
const ESTIMATED_OPTIONS = [
  {
    label: 'stinky',
    report: { priority: 1, time_to_block: 21600 },
    transaction: {},
  },
  {
    label: 'low',
    report: { priority: 1, time_to_block: 3600 },
    transaction: {},
  },
  {
    label: 'medium',
    report: { priority: 1, time_to_block: 900 },
    transaction: {},
  },
  {
    label: 'high',
    report: { priority: 1, time_to_block: 300 },
    transaction: {},
  },
  {
    label: 'opulent',
    report: { priority: 1.9982227488151656, time_to_block: 60 },
    transaction: {},
  },
  { label: 'custom' },
]
// const DR_VALUES_MOCK = {
//   commitAndRevealFee: '0.000000001',
//   dataRequest: '1',
//   fee: '1',
//   isWeightedFee: true,
//   minConsensusPercentage: '51',
//   rewardFee: '0.000000001',
//   witnesses: '3',
//   collateral: '1.00',
//   feeType: 'weighted',
//   template: {
//     id: 'ff9be44a-0dc0-4dcc-869c-badf5735a4b9',
//     creationDate: 1662566520882,
//     description: 'Eth price in USD',
//     lastTimeOpened: 1662709447458,
//     name: 'Eth price',
//     radRequest: {
//       aggregate: { filters: [[5, 1.5]], reducer: 3 },
//       retrieve: [
//         {
//           contentType: 'JSON API',
//           contentTypeOptions: {
//             'HTTP-GET': 'JSON API',
//             'HTTP-POST': 'JSON API',
//             RNG: 'Binary file',
//           },
//           headers: {},
//           kind: 'HTTP-GET',
//           kindOptions: ['HTTP-GET', 'RNG', 'HTTP-POST'],
//           script: [119, [100, '$var_1'], [87, 1000], 91],
//           url: 'https://www.bitstamp.net/api/v2/ticker/ethusd/',
//         },
//         {
//           contentType: 'JSON API',
//           contentTypeOptions: {
//             'HTTP-GET': 'JSON API',
//             'HTTP-POST': 'JSON API',
//             RNG: 'Binary file',
//           },
//           kind: 'HTTP-GET',
//           kindOptions: ['HTTP-GET', 'RNG', 'HTTP-POST'],
//           script: [
//             119,
//             [97, 'data'],
//             [24, 1],
//             [100, 'priceUsd'],
//             [87, 1000],
//             91,
//           ],
//           url: 'https://api.coincap.io/v2/assets',
//         },
//         {
//           contentType: 'JSON API',
//           contentTypeOptions: {
//             'HTTP-GET': 'JSON API',
//             'HTTP-POST': 'JSON API',
//             RNG: 'Binary file',
//           },
//           kind: 'HTTP-GET',
//           kindOptions: ['HTTP-GET', 'RNG', 'HTTP-POST'],
//           script: [
//             119,
//             [102, 'quotes'],
//             [102, 'USD'],
//             [100, 'price'],
//             [87, 1000],
//             91,
//           ],
//           url: 'https://api.coinpaprika.com/v1/tickers/eth-ethereum',
//         },
//       ],
//       tally: { filters: [[5, 1.5]], reducer: 3 },
//       timelock: 1662566188,
//     },
//     usedVariables: [{ id: 5, value: 'last', variable: 'var_1' }],
//     variables: [
//       {
//         description: '',
//         key: 'var_1',
//         type: 'String',
//         value: 'last',
//       },
//     ],
//     variablesIndex: 1,
//   },
// }
const SELECTED_FEE_MOCK = {
  label: 'stinky',
  report: { priority: 0, time_to_block: { UpTo: 480 } },
  transaction: {
    bytes:
      '12ef030af8020a280a260a220a20736fa60d756d126d1c6db1bb54934e2baead7622204673019a4c583340d6e5151001121e0a160a14b86218d6ef037abcbe7b80ab6a29d7cb07208b6510f6bbc1960b1aab020a9a0208acfee2980612490801122e68747470733a2f2f7777772e6269747374616d702e6e65742f6170692f76322f7469636b65722f6574687573642f1a1584187782186466247661725f318218571903e8185b12490801122068747470733a2f2f6170692e636f696e6361702e696f2f76322f6173736574731a238618778218616464617461821818018218646870726963655573648218571903e8185b125e0801123368747470733a2f2f6170692e636f696e70617072696b612e636f6d2f76312f7469636b6572732f6574682d657468657265756d1a258618778218666671756f746573821866635553448218646570726963658218571903e8185b1a0d0a0908051205fa3fc000001003220d0a0908051205fa3fc0000010031001180320012833308094ebdc0312720a4b0a490a4730450221008aab60a88540335416489370ad6fac054e203d736db20fcfab6ecb51b5d5db570220690e762cfc3f1983bc6f9118ac205e6f2dcdda592632f41f08544bd3f0e0285912230a2102421bbefba05a98592a837047f0ff841097970a0a497610645351c0987faf094e',
    fee: '0',
    transaction: {
      DataRequest: {
        body: {
          dr_output: {
            collateral: '1000000000',
            commit_and_reveal_fee: '1',
            data_request: {
              aggregate: {
                filters: [{ args: [250, 63, 192, 0, 0], op: 5 }],
                reducer: 3,
              },
              retrieve: [
                {
                  kind: 'HTTP-GET',
                  script: [
                    132, 24, 119, 130, 24, 100, 102, 36, 118, 97, 114, 95, 49,
                    130, 24, 87, 25, 3, 232, 24, 91,
                  ],
                  url: 'https://www.bitstamp.net/api/v2/ticker/ethusd/',
                },
                {
                  kind: 'HTTP-GET',
                  script: [
                    134, 24, 119, 130, 24, 97, 100, 100, 97, 116, 97, 130, 24,
                    24, 1, 130, 24, 100, 104, 112, 114, 105, 99, 101, 85, 115,
                    100, 130, 24, 87, 25, 3, 232, 24, 91,
                  ],
                  url: 'https://api.coincap.io/v2/assets',
                },
                {
                  kind: 'HTTP-GET',
                  script: [
                    134, 24, 119, 130, 24, 102, 102, 113, 117, 111, 116, 101,
                    115, 130, 24, 102, 99, 85, 83, 68, 130, 24, 100, 101, 112,
                    114, 105, 99, 101, 130, 24, 87, 25, 3, 232, 24, 91,
                  ],
                  url: 'https://api.coinpaprika.com/v1/tickers/eth-ethereum',
                },
              ],
              tally: {
                filters: [{ args: [250, 63, 192, 0, 0], op: 5 }],
                reducer: 3,
              },
              time_lock: 1662566188,
            },
            min_consensus_percentage: '51',
            witness_reward: '1',
            witnesses: '3',
          },
          inputs: [
            {
              output_pointer:
                '736fa60d756d126d1c6db1bb54934e2baead7622204673019a4c583340d6e515:1',
            },
          ],
          outputs: [
            {
              pkh: 'twit1hp3p34h0qdate0nmsz4k52whevrjpzm9h60cvq',
              time_lock: 0,
              value: '2999999990',
            },
          ],
        },
        signatures: [
          {
            public_key: {
              bytes: [
                66, 27, 190, 251, 160, 90, 152, 89, 42, 131, 112, 71, 240, 255,
                132, 16, 151, 151, 10, 10, 73, 118, 16, 100, 83, 81, 192, 152,
                127, 175, 9, 78,
              ],
              compressed: 2,
            },
            signature: {
              Secp256k1: {
                der: [
                  48, 69, 2, 33, 0, 138, 171, 96, 168, 133, 64, 51, 84, 22, 72,
                  147, 112, 173, 111, 172, 5, 78, 32, 61, 115, 109, 178, 15,
                  207, 171, 110, 203, 81, 181, 213, 219, 87, 2, 32, 105, 14,
                  118, 44, 252, 63, 25, 131, 188, 111, 145, 24, 172, 32, 94,
                  111, 45, 205, 218, 89, 38, 50, 244, 31, 8, 84, 75, 211, 240,
                  224, 40, 89,
                ],
              },
            },
          },
        ],
      },
    },
    transaction_id:
      '32dd59ad50f0f747ffa92abba3b349a870d0f8679a807b0ba3ef0ad64f10edc3',
  },
}
describe('SetFee.vue', () => {
  describe('should render properly the form items when custom option is not selected', () => {
    const createDataRequestMock = vi.fn()
    const createVTTMock = vi.fn()
    const clearErrorMock = vi.fn()
    const clearGeneratedTransactionMock = vi.fn()
    const getFeeEstimationReportMock = vi.fn()
    const setTransactionOptionsMock = vi.fn()
    const setSelectedFee = vi.fn()
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            errors: {
              createDataRequest: false,
              createVttError: false,
            },
            locale: DEFAULT_LOCALE,
            transactionOptions: ESTIMATED_OPTIONS,
            unit: 'nanoWit',
            feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
          },
          mutations: {
            selectedFee: vi.fn(() => {}),
            clearError: clearErrorMock,
            clearGeneratedTransaction: clearGeneratedTransactionMock,
            setTransactionOptions: setTransactionOptionsMock,
            setSelectedFee: setSelectedFee,
          },
          actions: {
            getFeeEstimationReport: getFeeEstimationReportMock,
            createDataRequest: createDataRequestMock,
            createVTT: createVTTMock,
          },
        },
      },
      stubs: {
        'el-button': ElButton,
        'el-form': ElForm,
        'el-switch': ElSwitch,
        'el-input': ElInput,
        'el-form-item': ElFormItem,
        SelectEstimatedFee: SelectEstimatedFee,
      },
    })

    const wrapper = shallowMount(SetFee, {
      data() {
        return {
          customFee: false,
        }
      },
      ...mockStore,
      props: {
        vttValues: {},
        drValues: null,
        selectedFee: {},
      },
    })
    test('should render select-estimated-fee', () => {
      expect(
        wrapper.find('[data-test="select-estimated-fee"]').isVisible(),
      ).toBe(true)
    })

    test('should not render custom fee input', () => {
      expect(wrapper.find('[data-test="tx-fee"]').exists()).toBeFalsy()
    })

    test('should not render fee type switch', () => {
      expect(wrapper.find('[data-test="fee-type-switch"]').exists()).toBeFalsy()
    })
  })

  describe('should render properly the form items when custom option is selected', () => {
    const createDataRequestMock = vi.fn()
    const createVTTMock = vi.fn()
    const clearErrorMock = vi.fn()
    const clearGeneratedTransactionMock = vi.fn()
    const getFeeEstimationReportMock = vi.fn()
    const setTransactionOptionsMock = vi.fn()
    const mockStore = createMocks({
      storeModules: {
        wallet: {
          state: {
            errors: {
              createDataRequest: false,
              createVttError: false,
            },
            transactionOptions: ESTIMATED_OPTIONS,
            unit: 'nanoWit',
            feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
          },
          mutations: {
            selectedFee: vi.fn(() => {}),
            clearError: clearErrorMock,
            clearGeneratedTransaction: clearGeneratedTransactionMock,
            setTransactionOptions: setTransactionOptionsMock,
          },
          actions: {
            getFeeEstimationReport: getFeeEstimationReportMock,
            createDataRequest: createDataRequestMock,
            createVTT: createVTTMock,
          },
        },
      },
      stubs: {
        'el-button': ElButton,
        'el-form': ElForm,
        'el-switch': ElSwitch,
        'el-input': ElInput,
        'el-form-item': ElFormItem,
        SelectEstimatedFee: SelectEstimatedFee,
      },
    })

    const wrapper = shallowMount(SetFee, {
      props: {
        vttValues: {},
        drValues: null,
      },
      ...mockStore,
    })

    wrapper.setData({
      customFee: true,
    })

    test('should render select-estimated-fee', () => {
      expect(
        wrapper.find('[data-test="select-estimated-fee"]').isVisible(),
      ).toBe(true)
    })

    test('should render custom fee input', () => {
      expect(wrapper.find('[data-test="tx-fee"]').isVisible()).toBe(true)
    })

    test('should render fee type switch', () => {
      expect(wrapper.find('[data-test="fee-type-switch"]').isVisible()).toBe(
        true,
      )
    })
  })

  describe('should show an error if there is a problem creating the vtt', () => {
    test('should show the error', async () => {
      const createDataRequestMock = vi.fn()
      const createVTTMock = vi.fn()
      const clearErrorMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const getFeeEstimationReportMock = vi.fn()
      const setTransactionOptionsMock = vi.fn()
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              errors: {
                createDataRequest: true,
                createVTT: false,
              },
              transactionOptions: ESTIMATED_OPTIONS,
              unit: 'nanoWit',
              feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
            },
            mutations: {
              selectedFee: vi.fn(() => {}),
              clearError: clearErrorMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
              setTransactionOptions: setTransactionOptionsMock,
            },
            actions: {
              getFeeEstimationReport: getFeeEstimationReportMock,
              createDataRequest: createDataRequestMock,
              createVTT: createVTTMock,
            },
          },
        },
        stubs: {
          'el-button': ElButton,
          'el-form': ElForm,
          'el-switch': ElSwitch,
          'el-input': ElInput,
          'el-form-item': ElFormItem,
          SelectEstimatedFee: SelectEstimatedFee,
        },
      })

      const wrapper = shallowMount(SetFee, {
        data() {
          return {
            customFee: true,
          }
        },
        props: {
          vttValues: {},
          drValues: null,
        },
        ...mockStore,
      })

      expect(wrapper.find('[data-test="fee-type-switch"]').isVisible()).toBe(
        true,
      )
    })
    test('should not show the error is it is not custom', async () => {
      const createDataRequestMock = vi.fn()
      const createVTTMock = vi.fn()
      const clearErrorMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const getFeeEstimationReportMock = vi.fn()
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              errors: {
                createDataRequest: false,
                createVTT: true,
              },
              transactionOptions: ESTIMATED_OPTIONS,
              unit: 'nanoWit',
              feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
            },
            mutations: {
              selectedFee: vi.fn(() => {}),
              clearError: clearErrorMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
            },
            actions: {
              getFeeEstimationReport: getFeeEstimationReportMock,
              createDataRequest: createDataRequestMock,
              createVTT: createVTTMock,
            },
          },
        },
        stubs: {
          'el-button': ElButton,
          'el-form': ElForm,
          'el-switch': ElSwitch,
          'el-input': ElInput,
          'el-form-item': ElFormItem,
          SelectEstimatedFee: SelectEstimatedFee,
        },
      })

      const wrapper = shallowMount(SetFee, {
        data() {
          return {
            customFee: false,
          }
        },
        ...mockStore,
        props: {
          vttValues: {},
          drValues: null,
        },
      })
      expect(wrapper.find('[data-test="create-vtt-error"]').exists()).toBe(
        false,
      )
    })
    test('should not show the error if there is no error', async () => {
      const createDataRequestMock = vi.fn()
      const createVTTMock = vi.fn()
      const clearErrorMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const getFeeEstimationReportMock = vi.fn()
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              errors: {
                createDataRequest: false,
                createVTT: false,
              },
              transactionOptions: ESTIMATED_OPTIONS,
              unit: 'nanoWit',
              feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
            },
            mutations: {
              selectedFee: vi.fn(() => {}),
              clearError: clearErrorMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
            },
            actions: {
              getFeeEstimationReport: getFeeEstimationReportMock,
              createDataRequest: createDataRequestMock,
              createVTT: createVTTMock,
            },
          },
        },
        stubs: {
          'el-button': ElButton,
          'el-form': ElForm,
          'el-switch': ElSwitch,
          'el-input': ElInput,
          'el-form-item': ElFormItem,
          SelectEstimatedFee: SelectEstimatedFee,
        },
      })

      const wrapper = shallowMount(SetFee, {
        data() {
          return {
            customFee: true,
          }
        },
        ...mockStore,
        props: {
          vttValues: {},
          drValues: null,
        },
      })
      expect(wrapper.find('[data-test="create-vtt-error"]').exists()).toBe(
        false,
      )
    })
  })

  describe('validate and send selected fee', () => {
    test('emit the event if the form has no errors', async () => {
      const createDataRequestMock = vi.fn()
      const createVTTMock = vi.fn()
      const clearErrorMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const getFeeEstimationReportMock = vi.fn()
      const setTransactionOptionsMock = vi.fn()
      const setSelectedFee = vi.fn()
      const selectedFeeMock = vi.fn(() => SELECTED_FEE_MOCK)
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              locale: DEFAULT_LOCALE,
              errors: {
                createDataRequest: false,
                createVTT: false,
                feeEstimationReportError: false,
              },
              transactionOptions: ESTIMATED_OPTIONS,
              unit: 'nanoWit',
              feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
            },
            mutations: {
              selectedFee: selectedFeeMock,
              setSelectedFee: setSelectedFee,
              clearError: clearErrorMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
              setTransactionOptions: setTransactionOptionsMock,
            },
            actions: {
              getFeeEstimationReport: getFeeEstimationReportMock,
              createDataRequest: createDataRequestMock,
              createVTT: createVTTMock,
            },
          },
        },
        stubs: {
          'el-button': ElButton,
          'el-form': ElForm,
          'el-switch': ElSwitch,
          'el-input': ElInput,
          'el-form-item': ElFormItem,
          SelectEstimatedFee: SelectEstimatedFee,
        },
      })

      const wrapper = mount(SetFee, {
        ...mockStore,
        data() {
          return {
            customFee: false,
            transactionToSend: {
              result: {},
            },
          }
        },
        props: {
          vttValues: DEFAULT_VTT_VALUES,
          estimatedFee: {},
        },
      })
      wrapper.find('[data-test="continue"]').trigger('click')
      expect(wrapper.emitted()['click']).toBeTruthy()
    })
    test('NOT emit the event if the form has errors', async () => {
      const createDataRequestMock = vi.fn()
      const createVTTMock = vi.fn()
      const clearErrorMock = vi.fn()
      const clearGeneratedTransactionMock = vi.fn()
      const getFeeEstimationReportMock = vi.fn()
      const setTransactionOptionsMock = vi.fn()
      const selectedFeeMock = vi.fn(() => ({
        transaction: {
          error: 'Error',
        },
      }))
      const mockStore = createMocks({
        storeModules: {
          wallet: {
            state: {
              locale: DEFAULT_LOCALE,
              errors: {
                createDataRequest: true,
                createVTT: false,
              },
              unit: 'nanoWit',
              feeEstimationReport: FEE_ESTIMATION_REPORT_MOCK,
            },
            mutations: {
              selectedFee: selectedFeeMock,
              clearError: clearErrorMock,
              clearGeneratedTransaction: clearGeneratedTransactionMock,
              setTransactionOptions: setTransactionOptionsMock,
            },
            actions: {
              getFeeEstimationReport: getFeeEstimationReportMock,
              createDataRequest: createDataRequestMock,
              createVTT: createVTTMock,
            },
          },
        },
        stubs: {
          'el-button': ElButton,
          'el-form': ElForm,
          'el-switch': ElSwitch,
          'el-input': ElInput,
          'el-form-item': ElFormItem,
          SelectEstimatedFee: SelectEstimatedFee,
        },
      })

      const wrapper = mount(SetFee, {
        data() {
          return {
            customFee: false,
            transactionToSend: {
              error: 'Error',
            },
          }
        },
        props: {
          vttValues: DEFAULT_VTT_VALUES,
          estimatedFee: {},
        },
        ...mockStore,
      })
      await wrapper.find('[data-test="continue"]').trigger('click')
      expect(wrapper.emitted()['set-transaction']).toBeFalsy()
    })
  })
})
