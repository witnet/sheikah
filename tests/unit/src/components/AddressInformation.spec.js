import AddressInformation from '@/components/AddressInformation'
import DotsLoading from '@/components/DotsLoading'
import { formatDateVerbose } from '@/utils'

describe('AddressInformation.vue', () => {
  describe('should render correctly', () => {
    it('empty state', () => {
      const wrapper = mount(AddressInformation)
      expect(wrapper.find('.information').text()).toBe(
        `You haven't generated addresses yet. Click above to generate one.`
      )
    })

    it('loading state', () => {
      const wrapper = mount(AddressInformation, {
        propsData: {
          used: true,
          index: 0,
          pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
          unit: 'nanoWit',
          amount: 100,
          payments: 2,
          firstDate: new Date(),
          lastDate: new Date(),
          loading: true,
        },
      })

      expect(wrapper.find(DotsLoading).exists()).toBe(true)
    })

    describe('used address', () => {
      it('should render red tag', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.tag').classes('red')).toBe(true)
      })

      it('should NOT render copy button', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.copy').exists()).toBe(false)
      })

      it('should render hidden pkh', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.pkh').text()).toBe(
          'twit1270yg7pkm2w9mlq ... wph3flrp862zw0ft'
        )
      })

      it('should render payment number', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
        })

        expect(
          wrapper
            .findAll('.bold')
            .at(0)
            .text()
        ).toBe('2 payments')
      })

      it('should render the first date', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
        })

        expect(
          wrapper
            .findAll('.bold')
            .at(2)
            .text()
        ).toBe(formatDateVerbose(date1))
      })

      it('should render the first date', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: true,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(
          wrapper
            .findAll('.bold')
            .at(3)
            .text()
        ).toBe(formatDateVerbose(date2))
      })
    })

    describe('not used address', () => {
      it('should render red tag', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: false,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.tag').classes('green')).toBe(true)
      })

      it('should render pkh', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: false,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.pkh').text()).toBe(
          'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft'
        )
      })

      it('should render payment number', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: false,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 0,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(
          wrapper
            .findAll('.bold')
            .at(0)
            .text()
        ).toBe('0 payments')
      })

      it('should NOT render not used related information', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: false,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 0,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.findAll('.bold').length).toBe(1)
      })

      it('should render copy button', () => {
        const date1 = new Date()
        const date2 = new Date()
        const wrapper = mount(AddressInformation, {
          ...createComponentMocks({
            store: {
              wallet: {
                state: {
                  currency: 'nanoWit',
                },
              },
            },
          }),
          propsData: {
            used: false,
            index: 0,
            pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
            amount: 100,
            payments: 2,
            firstPaymentDate: date1,
            lastPaymentDate: date2,
          },
        })

        expect(wrapper.find('.copy').exists()).toBe(true)
      })
    })
  })
})
