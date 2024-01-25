import Addresses from '@/components/Addresses.vue'
import AddressList from '@/components/AddressList.vue'
import AddressInformation from '@/components/AddressInformation.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'
import i18n from '@/plugins/i18n'

describe('Addresses.vue', () => {
  describe('should render correctly', () => {
    test('should render AddressList', () => {
      const mockStore = createMockStore({
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
        global: {
          plugins: [mockStore, i18n],
        },
      })

      expect(wrapper.findComponent(AddressList).exists()).toBe(true)
    })

    test('should render AddressInformation', () => {
      const mockStore = createMockStore({
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
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.findComponent(AddressInformation).exists()).toBe(true)
    })
  })

  describe('should handle events correctly', () => {
    test('should handle generate-address event', async () => {
      const mockStore = createMockStore({
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
        global: {
          plugins: [i18n, mockStore],
        },
      })

      wrapper.findComponent(AddressList).vm.$emit('generate-address')

      await flushPromises()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    test('should handle select-address event', async () => {
      const mockStore = createMockStore({
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
        global: {
          plugins: [i18n, mockStore],
        },
      })

      wrapper.findComponent(AddressList).vm.$emit('select-address', 0)

      await flushPromises()

      expect(wrapper.vm.selectedIndex).toBe(0)
    })
  })
})
