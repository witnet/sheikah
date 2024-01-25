import AddressList from '@/components/AddressList.vue'
import AddressCardButton from '@/components/AddressCardButton.vue'
import AddressCard from '@/components/AddressCard.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'

describe('AddressList.vue', () => {
  describe('should render correctly the component', () => {
    test('should contain the AddressCardButton to generate a new address', () => {
      const mockStore = createMockStore({
        uiInteractions: {
          state: {
            receiveTransactionCLicked: false,
          },
        },
      })
      const wrapper = mount(AddressList, {
        props: {
          addresses: [
            {
              used: false,
              address: 'twit1pa6hu345psdc48klzrxx2v2vetgax729dwrcgl',
            },
          ],
          selected: 0,
        },
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.findComponent(AddressCardButton).exists()).toBe(true)
    })

    test('should list an addressCard for each address passed', () => {
      const mockStore = createMockStore({
        uiInteractions: {
          state: {
            receiveTransactionCLicked: false,
          },
        },
      })
      const wrapper = mount(AddressList, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
        global: {
          plugins: [i18n, mockStore],
        },
      })

      expect(wrapper.findAllComponents(AddressCard).length).toBe(2)
    })
  })

  describe('should emit events', () => {
    test('should emit event to generate address on AddressCardButton click', async () => {
      const mockStore = createMockStore({
        uiInteractions: {
          state: {
            receiveTransactionCLicked: false,
          },
        },
      })
      const wrapper = mount(AddressList, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
        global: {
          plugins: [i18n, mockStore],
        },
      })

      wrapper.findComponent(AddressCardButton).trigger('click')

      await nextTick()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    test('should emit event to select an address on AddressCard click', async () => {
      const mockStore = createMockStore({
        uiInteractions: {
          state: {
            receiveTransactionCLicked: false,
          },
        },
      })
      const wrapper = mount(AddressList, {
        props: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
        global: {
          plugins: [i18n, mockStore],
        },
      })

      wrapper.findAllComponents(AddressCard).at(1).trigger('click')

      await nextTick()

      expect(wrapper.emitted()['select-address'][0]).toEqual([1])
    })
  })
})
