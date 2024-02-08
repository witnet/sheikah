import AddressInformation from '@/components/AddressInformation.vue'
import DotsLoading from '@/components/DotsLoading.vue'
import { formatDateVerbose } from '@/utils'

describe('AddressInformation.vue', () => {
  describe('should render correctly', () => {
    test('empty state', () => {
      const wrapper = mount(
        AddressInformation,
        createMocks({ storeModules: {} }),
      )
      expect(wrapper.find('.information').text()).toBe(
        `You haven't generated addresses yet. Click above to generate one.`,
      )
    })

    test('loading state', () => {
      const wrapper = mount(AddressInformation, {
        props: {
          used: true,
          index: 0,
          address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
          unit: 'nanoWit',
          amount: '100',
          payments: 2,
          firstDate: new Date(),
          lastDate: new Date(),
          loading: true,
        },
        ...createMocks(),
      })

      expect(wrapper.findComponent(DotsLoading).exists()).toBe(true)
    })

    describe('used address', () => {
      test('should render red tag', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.tag').classes('red')).toBe(true)
      })

      test('should NOT render copy button', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.copy').exists()).toBe(false)
      })

      test('should render hidden address', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.address').text()).toBe(
          'twit1270yg7pkm2w9m...zrwph3flrp862zw0ft',
        )
      })

      test('should render payment number', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.findAll('.bold').at(0).text()).toBe('2 payments')
      })

      test('should render the first date', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.findAll('.bold').at(2).text()).toBe(
          formatDateVerbose(date1, 'en'),
        )
      })

      test('should render the first date', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: true,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.findAll('.bold').at(3).text()).toBe(
          formatDateVerbose(date2, 'en'),
        )
      })
    })

    describe('not used address', () => {
      test('should render red tag', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: false,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.tag').classes('green')).toBe(true)
      })

      test('should render address', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: false,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.address').text()).toBe(
          'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
        )
      })

      test('should render payment number', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: false,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 0,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.findAll('.bold').at(0).text()).toBe('0 payments')
      })

      test('should NOT render not used related information', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: false,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 0,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.findAll('.bold').length).toBe(1)
      })

      test('should render copy button', () => {
        const date1 = new Date()
        const date2 = new Date()
        const mockStore = createMocks({
          storeModules: {
            wallet: {
              state: {
                unit: 'nanoWit',
                locale: 'en',
              },
            },
          },
        })
        const wrapper = mount(AddressInformation, {
          props: {
            used: false,
            index: 0,
            address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: '100',
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...mockStore,
        })

        expect(wrapper.find('.copy').exists()).toBe(true)
      })
    })
  })
})
