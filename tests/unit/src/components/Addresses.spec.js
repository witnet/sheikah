import Addresses from '@/components/Addresses'
import AddressList from '@/components/AddressList'
import AddressInformation from '@/components/AddressInformation'

describe('Addresses.vue', () => {
  describe('should render correctly', () => {
    it('should render AddressList', () => {
      const wrapper = mount(Addresses, {
        propsData: {
          addresses: [
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 0,
            },
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 1,
            },
          ],
        },
      })

      expect(wrapper.find(AddressList).exists()).toBe(true)
    })

    it('should render AddressInformation', () => {
      const wrapper = mount(Addresses, {
        propsData: {
          addresses: [
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 0,
            },
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 1,
            },
          ],
        },
      })

      expect(wrapper.find(AddressInformation).exists()).toBe(true)
    })
  })

  describe('should handle events correctly', () => {
    it('should handle generate-address event', async () => {
      const wrapper = mount(Addresses, {
        propsData: {
          addresses: [
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 0,
            },
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 1,
            },
          ],
        },
      })

      wrapper.find(AddressList).vm.$emit('generate-address')

      await nextTick()

      expect(wrapper.emitted()['generate-address']).toBeTruthy()
    })

    it('should handle select-address event', async () => {
      const wrapper = mount(Addresses, {
        propsData: {
          addresses: [
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
              index: 0,
              used: false,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 0,
            },
            {
              pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
              index: 0,
              used: true,
              amount: 5000,
              unit: 'nanoWits',
              firstDate: new Date(),
              lastDate: new Date(),
              payments: 1,
            },
          ],
        },
      })

      wrapper.find(AddressList).vm.$emit('select-address', 0)

      await nextTick()

      expect(wrapper.vm.selectedIndex).toBe(0)
    })
  })
})
