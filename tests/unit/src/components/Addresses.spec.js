import Addresses from '@/components/Addresses.vue'
import AddressList from '@/components/AddressList.vue'
import AddressInformation from '@/components/AddressInformation.vue'

describe('Addresses.vue', () => {
  describe('should render correctly', () => {
    test('should render AddressList', () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionClicked: false,
              generateAddressLoading: false,
            },
          },
          wallet: {
            state: {
              unit: 'nanoWit',
              locale: 'en',
            },
          },
        },
      })
      const wrapper = mount(Addresses, {
        ...mockStore,
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              receivedAmount: '5000',
              unit: 'nanoWits',
              lastPaymentDate: new Date(),
              firstPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              receivedAmount: '5000',
              unit: 'nanoWits',
              lastPaymentDate: new Date(),
              firstPaymentDate: new Date(),
              payments: 1,
            },
          ],
        },
      })

      expect(wrapper.findComponent(AddressList).exists()).toBe(true)
    })

    test('should render AddressInformation', () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionClicked: false,
            },
          },
          wallet: {
            state: {
              unit: 'nanoWit',
              locale: 'en',
            },
          },
        },
      })
      const wrapper = mount(Addresses, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
        },
        ...mockStore,
      })

      expect(wrapper.findComponent(AddressInformation).exists()).toBe(true)
    })
  })

  describe('should handle events correctly', () => {
    test('should handle generate-address event', async () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionClicked: false,
            },
          },
          wallet: {
            state: {
              unit: 'nanoWit',
              locale: 'en',
            },
          },
        },
      })
      const wrapper = mount(Addresses, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
        },
        ...mockStore,
      })

      wrapper.findComponent(AddressList).vm.$emit('generate-address')

      await flushPromises()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    test('should handle select-address event', async () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionClicked: false,
            },
          },
          wallet: {
            state: {
              unit: 'nanoWit',
              locale: 'en',
            },
          },
        },
      })
      const wrapper = mount(Addresses, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              receivedAmount: '5000',
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
        },
        ...mockStore,
      })

      wrapper.findComponent(AddressList).vm.$emit('select-address', 0)

      await flushPromises()

      expect(wrapper.vm.selectedIndex).toBe(0)
    })
  })
})
