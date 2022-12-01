import Addresses from '@/components/Addresses.vue'
import AddressList from '@/components/AddressList.vue'
import AddressInformation from '@/components/AddressInformation.vue'

describe('Addresses.vue', () => {
  describe('should render correctly', () => {
    it('should render AddressList', () => {
      const wrapper = mount(Addresses, {
        propsData: {
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
        ...createComponentMocks({
          store: {
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
        }),
      })

      expect(wrapper.findComponent(AddressList).exists()).toBe(true)
    })

    it('should render AddressInformation', () => {
      const wrapper = mount(Addresses, {
        propsData: {
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
        ...createComponentMocks({
          store: {
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
        }),
      })

      expect(wrapper.findComponent(AddressInformation).exists()).toBe(true)
    })
  })

  describe('should handle events correctly', () => {
    it('should handle generate-address event', async () => {
      const wrapper = mount(Addresses, {
        propsData: {
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
        ...createComponentMocks({
          store: {
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
        }),
      })

      wrapper.findComponent(AddressList).vm.$emit('generate-address')

      await nextTick()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    it('should handle select-address event', async () => {
      const wrapper = mount(Addresses, {
        propsData: {
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
        ...createComponentMocks({
          store: {
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
        }),
      })

      wrapper.findComponent(AddressList).vm.$emit('select-address', 0)

      await nextTick()

      expect(wrapper.vm.selectedIndex).toBe(0)
    })
  })
})
