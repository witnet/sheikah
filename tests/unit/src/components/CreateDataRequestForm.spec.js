import CreateDataRequestForm from '@/components/CreateDataRequestForm'

describe('CreateDataRequestForm.vue', () => {
  describe('should render properly the form items', () => {
    const wrapper = mount(
      CreateDataRequestForm,
      createComponentMocks({
        router: true,
        store: {
          wallet: {
            state: {
              errors: {
                createDataRequest: false,
              },
              balance: { total: 400000000000 },
              currency: 'nanoWit',
            },
          },
        },
      }),
    )

    it('should render create-data-request-submit button', () => {
      expect(
        wrapper.find('[data-test="create-data-request-submit"]').isVisible(),
      ).toBe(true)
    })

    it('should render witnesses input', () => {
      expect(wrapper.find('[data-test="witnesses"]').isVisible()).toBe(true)
    })

    it('should render collateral input', () => {
      expect(wrapper.find('[data-test="collateral"]').isVisible()).toBe(true)
    })

    it('should render consensus input', () => {
      expect(wrapper.find('[data-test="consensus"]').isVisible()).toBe(true)
    })

    it('should render dr-fee input', () => {
      expect(wrapper.find('[data-test="dr-fee"]').isVisible()).toBe(true)
    })

    it('should render commit-reveal-fee input', () => {
      expect(wrapper.find('[data-test="reward-fee"]').isVisible()).toBe(true)
    })

    it('should render the submit data request button', () => {
      expect(wrapper.find('[data-test="commit-reveal-fee"]').isVisible()).toBe(
        true,
      )
    })
  })

  describe('should change input value on update', () => {
    const wrapper = mount(
      CreateDataRequestForm,
      createComponentMocks({
        router: true,
        store: {
          wallet: {
            state: {
              errors: {
                createDataRequest: false,
              },
              balance: { total: 400000000000 },
              currency: 'nanoWit',
            },
          },
        },
      }),
    )

    it('should change witnesses input value', () => {
      wrapper.find('[data-test="witnesses"]').setValue('100')
      expect(wrapper.find('[data-test="witnesses"]').element.value).toEqual(
        '100',
      )
    })

    it('should change collateral input value', () => {
      wrapper.find('[data-test="collateral"]').setValue('100')
      expect(wrapper.find('[data-test="collateral"]').element.value).toEqual(
        '100',
      )
    })

    it('should change consensus input value', () => {
      wrapper.find('[data-test="consensus"]').setValue('100')
      expect(wrapper.find('[data-test="consensus"]').element.value).toEqual(
        '100',
      )
    })

    it('should change dr-fee input value', () => {
      wrapper.find('[data-test="dr-fee"]').setValue('100')
      expect(wrapper.find('[data-test="dr-fee"]').element.value).toEqual('100')
    })

    it('should change reward-fee input value', () => {
      wrapper.find('[data-test="reward-fee"]').setValue('100')
      expect(wrapper.find('[data-test="reward-fee"]').element.value).toEqual(
        '100',
      )
    })

    it('should change commit-reveal-fee input value', () => {
      wrapper.find('[data-test="commit-reveal-fee"]').setValue('100')
      expect(
        wrapper.find('[data-test="commit-reveal-fee"]').element.value,
      ).toEqual('100')
    })
  })

  describe('should show an error id there is a problem creating the data request', () => {
    it('should show the error', async () => {
      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: true,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )
      expect(
        wrapper.find('[data-test="create-data-request-error"]').isVisible(),
      ).toBe(true)
    })
  })

  describe('should emit the event if the form has no errors', () => {
    it('should emit create data request event', async () => {
      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: false,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )
      wrapper.find('[data-test="commit-reveal-fee"]').setValue('1')
      wrapper.find('[data-test="collateral"]').setValue('10000000000')
      await wrapper
        .find('[data-test="create-data-request-submit"]')
        .trigger('click')

      expect(wrapper.emitted()['create-dr']).toBeTruthy()
    })

    it('should show an error if the input cannot be converted to number', async () => {
      const spy = jest.spyOn(console, 'warn')

      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: false,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )

      wrapper.find('[data-test="commit-reveal-fee"]').setValue('hola')
      wrapper.find('[data-test="create-data-request-submit"]').trigger('click')

      expect(spy).toHaveBeenCalledWith('async-validator:', [
        'commitAndRevealFee is required',
      ])
    })

    it('should show an error if the input is less than 1 nanoWit', async () => {
      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: false,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )
      wrapper.setData({ rules: getNormalizedFormRules(wrapper) })
      wrapper.find('[data-test="dr-fee"]').setValue('0.000000000001')
      wrapper.find('[data-test="collateral"]').setValue('10000000000')
      await wrapper
        .find('[data-test="create-data-request-submit"]')
        .trigger('click')

      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `The minimun fee cannot be less than 1 nanoWit`,
      )
    })

    it('should show an error if the collateral is less than 1 wit', async () => {
      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: false,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )
      wrapper.find('[data-test="collateral"]').setValue('1')
      await wrapper
        .find('[data-test="create-data-request-submit"]')
        .trigger('click')

      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `The minimun collateral cannot be less than 1 wit`,
      )
    })

    it('should show an error if the total amount is greater than balance', async () => {
      const wrapper = mount(
        CreateDataRequestForm,
        createComponentMocks({
          router: true,
          store: {
            wallet: {
              state: {
                errors: {
                  createDataRequest: false,
                },
                balance: { total: 400000000000 },
                currency: 'nanoWit',
              },
            },
          },
        }),
      )
      wrapper.setData({ rules: getNormalizedFormRules(wrapper) })

      wrapper.find('[data-test="collateral"]').setValue('100000000000')
      wrapper.find('[data-test="dr-fee"]').setValue('500000000000')
      await wrapper
        .find('[data-test="create-data-request-submit"]')
        .trigger('click')

      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `You don't have enough funds`,
      )
    })
  })
})
