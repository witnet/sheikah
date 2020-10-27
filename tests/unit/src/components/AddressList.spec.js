import AddressList from '@/components/AddressList'
import AddressCardButton from '@/components/AddressCardButton'
import AddressCard from '@/components/AddressCard'

describe('AddressList.vue', () => {
  describe('should render correctly the component', () => {
    it('should contain the AddressCardButton to generate a new address', () => {
      const wrapper = mount(AddressList, {
        ...createComponentMocks({
          store: {
            uiInteractions: {
              state: {
                receiveTransactionCLicked: false,
              },
            },
          },
        }),
        propsData: {
          addresses: [
            {
              used: false,
              address: 'twit1pa6hu345psdc48klzrxx2v2vetgax729dwrcgl',
            },
          ],
          selected: 0,
        },
      })

      expect(wrapper.findComponent(AddressCardButton).exists()).toBe(true)
    })

    it('should list an addressCard for each address passed', () => {
      const wrapper = mount(AddressList, {
        ...createComponentMocks({
          store: {
            uiInteractions: {
              state: {
                receiveTransactionCLicked: false,
              },
            },
          },
        }),
        propsData: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
      })

      expect(wrapper.findAllComponents(AddressCard).length).toBe(2)
    })
  })

  describe('should emit events', () => {
    it('should emit event to generate address on AddressCardButton click', async () => {
      const wrapper = mount(AddressList, {
        ...createComponentMocks({
          store: {
            uiInteractions: {
              state: {
                receiveTransactionCLicked: false,
              },
            },
          },
        }),
        propsData: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
      })

      wrapper.findComponent(AddressCardButton).trigger('click')

      await nextTick()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    it('should emit event to select an address on AddressCard click', async () => {
      const wrapper = mount(AddressList, {
        ...createComponentMocks({
          store: {
            uiInteractions: {
              state: {
                receiveTransactionCLicked: false,
              },
            },
          },
        }),
        propsData: {
          addresses: [
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 0,
            },
            {
              address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: false,
              amount: 5000,
              currency: 'nanoWits',
              firstPaymentDate: new Date(),
              lastPaymentDate: new Date(),
              payments: 1,
            },
          ],
          selected: 0,
        },
      })

      wrapper
        .findAllComponents(AddressCard)
        .at(1)
        .trigger('click')

      await nextTick()

      expect(wrapper.emitted()['select-address'][0]).toEqual([1])
    })
  })
})
