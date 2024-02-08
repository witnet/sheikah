import CreateDataRequestForm from '@/components/SendTransaction/CreateDataRequestForm.vue'
import { DR_DEFAULT_VALUES } from '@/constants'

import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'

describe('CreateDataRequestForm.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: {
        state: {
          errors: {
            createDataRequest: false,
          },
          balance: { total: '400000000000' },
          unit: 'nanoWit',
        },
      },
    },
    stubs: {
      'el-input': ElInput,
      'el-button': ElButton,
      'el-form': ElForm,
      'el-form-item': ElFormItem,
      AppendUnit: true,
      teleport: true,
    },
  })
  describe('should render properly the form items', () => {
    const wrapper = mount(CreateDataRequestForm, {
      props: {
        drValues: DR_DEFAULT_VALUES,
      },
      ...mockStore,
    })

    test('should render create-data-request-submit button', () => {
      expect(
        wrapper.find('[data-test="create-data-request-submit"]').isVisible(),
      ).toBe(true)
    })

    test('should render witnesses input', () => {
      expect(wrapper.find('[data-test="witnesses"]').isVisible()).toBe(true)
    })

    test('should render collateral input', () => {
      expect(wrapper.find('[data-test="collateral"]').isVisible()).toBe(true)
    })

    test('should render consensus input', () => {
      expect(wrapper.find('[data-test="consensus"]').isVisible()).toBe(true)
    })

    test('should render commit-reveal-fee input', () => {
      expect(wrapper.find('[data-test="reward-fee"]').isVisible()).toBe(true)
    })

    test('should render the submit data request button', () => {
      expect(wrapper.find('[data-test="commit-reveal-fee"]').isVisible()).toBe(
        true,
      )
    })
  })

  describe('should change input value on update', () => {
    const wrapper = mount(CreateDataRequestForm, {
      props: {
        drValues: DR_DEFAULT_VALUES,
      },
      ...mockStore,
    })

    test('should change witnesses input value', () => {
      wrapper.find('[data-test="witnesses"]').setValue('100')
      expect(wrapper.find('[data-test="witnesses"]').element.value).toEqual(
        '100',
      )
    })

    test('should change collateral input value', () => {
      wrapper.find('[data-test="collateral"]').setValue('100')
      expect(wrapper.find('[data-test="collateral"]').element.value).toEqual(
        '100',
      )
    })

    test('should change consensus input value', () => {
      wrapper.find('[data-test="consensus"]').setValue('100')
      expect(wrapper.find('[data-test="consensus"]').element.value).toEqual(
        '100',
      )
    })

    test('should change reward-fee input value', () => {
      wrapper.find('[data-test="reward-fee"]').setValue('100')
      expect(wrapper.find('[data-test="reward-fee"]').element.value).toEqual(
        '100',
      )
    })

    test('should change commit-reveal-fee input value', () => {
      wrapper.find('[data-test="commit-reveal-fee"]').setValue('100')
      expect(
        wrapper.find('[data-test="commit-reveal-fee"]').element.value,
      ).toEqual('100')
    })
  })

  describe('should emit the event if the form has no errors', () => {
    test('should emit create data request event', async () => {
      const wrapper = mount(CreateDataRequestForm, {
        props: {
          drValues: DR_DEFAULT_VALUES,
        },
        emits: ['set-dr-values'],
        ...mockStore,
      })
      wrapper.find('[data-test="commit-reveal-fee"]').setValue('1')
      wrapper.find('[data-test="collateral"]').setValue('10000000000')
      const submitBtn = wrapper.find('[data-test="create-data-request-submit"]')
      await submitBtn.trigger('click')
      await flushPromises()
      expect(wrapper.emitted()['set-dr-values']).toBeTruthy()
    })
    // TODO: Skip until being able to access to element plus input error
    test.skip('should show an error if the input cannot be converted to number', async () => {
      const wrapper = mount(CreateDataRequestForm, {
        props: {
          drValues: DR_DEFAULT_VALUES,
        },
        ...mockStore,
      })

      wrapper.find('[data-test="commit-reveal-fee"]').setValue('hola')
      wrapper.find('[data-test="collateral"]').setValue('10000000000')
      const submitBtn = wrapper.find('[data-test="create-data-request-submit"]')
      await submitBtn.trigger('click')
      await flushPromises()
      await flushPromises()
      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `This should be a number`,
      )
    })

    // TODO: Skip until being able to access to element plus input error
    test.skip('should show an error if the input is less than 1 nanoWit', async () => {
      const wrapper = mount(CreateDataRequestForm, {
        props: {
          drValues: DR_DEFAULT_VALUES,
        },
        ...mockStore,
      })
      wrapper.setData({ rules: getNormalizedFormRules(wrapper) })
      wrapper.find('[data-test="commit-reveal-fee"]').setValue('0.000000000001')
      wrapper.find('[data-test="collateral"]').setValue('10000000000')
      const submitBtn = wrapper.find('[data-test="create-data-request-submit"]')
      await submitBtn.trigger('click')
      await flushPromises()
      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `The amount cannot be less than 1 nanoWit`,
      )
    })

    // TODO: Skip until being able to access to element plus input error
    test.skip('should show an error if the collateral is less than 1 wit', async () => {
      const wrapper = mount(CreateDataRequestForm, {
        props: {
          drValues: DR_DEFAULT_VALUES,
        },
        ...mockStore,
      })

      wrapper.find('[data-test="collateral"]').setValue('0.1')
      const submitBtn = wrapper.find('[data-test="create-data-request-submit"]')
      await submitBtn.trigger('click')
      await flushPromises()
      expect(wrapper.find('.el-form-item__error').text()).toBe(
        `The minimum collateral cannot be less than 1 wit`,
      )
    })
  })
})
