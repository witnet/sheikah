import AddressList from '@/components/AddressList.vue'
import AddressCardButton from '@/components/AddressCardButton.vue'
import AddressCard from '@/components/AddressCard.vue'

import { ElTooltip } from 'element-plus'

describe('AddressList.vue', () => {
  describe('should render correctly the component', () => {
    test('should contain the AddressCardButton to generate a new address', () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionCLicked: false,
            },
          },
        },
        stubs: {
          AddressCard: AddressCard,
          AddressCardButton: AddressCardButton,
          'el-tooltip': ElTooltip,
          'font-awesome-icon': true,
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
        ...mockStore,
      })

      expect(wrapper.findComponent(AddressCardButton).exists()).toBe(true)
    })

    test('should list an addressCard for each address passed', () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionCLicked: false,
            },
          },
        },
        stubs: {
          AddressCard: AddressCard,
          AddressCardButton: AddressCardButton,
          'el-tooltip': ElTooltip,
          'font-awesome-icon': true,
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
        ...mockStore,
      })

      expect(wrapper.findAllComponents(AddressCard).length).toBe(2)
    })
  })

  describe('should emit events', () => {
    test('should emit event to generate address on AddressCardButton click', async () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionCLicked: false,
            },
          },
        },
        stubs: {
          AddressCard: AddressCard,
          AddressCardButton: AddressCardButton,
          'el-tooltip': ElTooltip,
          'font-awesome-icon': true,
        },
      })
      const wrapper = mount(AddressList, {
        ...mockStore,
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
      })
      wrapper.findAllComponents(AddressCardButton).at(0).trigger('click')

      await flushPromises()

      expect(wrapper.emitted()['click']).toBeTruthy()
    })

    test('should emit event to select an address on AddressCard click', async () => {
      const mockStore = createMocks({
        storeModules: {
          uiInteractions: {
            state: {
              receiveTransactionCLicked: false,
            },
          },
        },
        stubs: {
          AddressCard: AddressCard,
          AddressCardButton: AddressCardButton,
          'el-tooltip': ElTooltip,
          'font-awesome-icon': true,
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
        ...mockStore,
      })

      wrapper.findAllComponents(AddressCard).at(1).trigger('click')

      await flushPromises()

      expect(wrapper.emitted()['select-address'][0]).toEqual([1])
    })
  })
})
