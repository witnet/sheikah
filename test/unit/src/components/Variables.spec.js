import Variables from '@/components/Variables.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'

describe('Variables.vue', () => {
  describe('should render properly the rename template form', () => {
    const mockStore = createMockStore({
      wallet: {
        state: {
          theme: 'light',
        },
      },
      rad: {
        state: {
          currentTemplate: {
            variables: [
              {
                description:
                  'Helps users of this template understand what this variable is used for',
                key: 'my_var_0',
                type: 'Boolean',
                value:
                  'The default String that this variable will take if an user does not override it',
              },
            ],
          },
        },
        getters: {
          variablesKeys: () => {},
        },
        mutations: {
          DELETE_VARIABLE: () => {},
          CREATE_VARIABLE: () => {},
          UPDATE_VARIABLES: () => {},
        },
      },
    })
    const wrapper = mount(Variables, {
      global: {
        plugins: [mockStore],
      },
      data() {
        return {
          errors: [],
          keys: ['my_var_0'],
        }
      },
    })

    test('should render the name label', () => {
      expect(wrapper.find('[data-test="name-label"]').text()).toEqual('Name')
    })

    test('should render the description label', () => {
      expect(wrapper.find('[data-test="description-label"]').text()).toEqual(
        'Description',
      )
    })

    test('should render the data type label', () => {
      expect(wrapper.find('[data-test="type-label"]').text()).toEqual(
        'Data type',
      )
    })

    test('should render the value label', () => {
      expect(wrapper.find('[data-test="value-label"]').text()).toEqual(
        'Default value',
      )
    })

    test('should render the delete variable button', () => {
      expect(wrapper.find('[data-test="delete-var-btn"]').exists()).toBe(true)
    })

    test('should render the add variable button', () => {
      expect(wrapper.find('[data-test="add-variable"]').exists()).toBe(true)
    })

    test('should change the variable value when trigger', () => {
      wrapper.find('[data-test="edit-var-value-input"]').setValue('new_value')
      expect(
        wrapper.find('[data-test="edit-var-value-input"]').element.value,
      ).toEqual('new_value')
    })

    test('should change the variable description when trigger', () => {
      wrapper
        .find('[data-test="edit-var-description-input"]')
        .setValue('new_description')
      expect(
        wrapper.find('[data-test="edit-var-description-input"]').element.value,
      ).toEqual('new_description')
    })

    test('should change the variable description when trigger', () => {
      wrapper.find('[data-test="edit-var-input"]').setValue('new_key')
      expect(
        wrapper.find('[data-test="edit-var-input"]').element.value,
      ).toEqual('new_key')
    })
  })
  describe('should update the inputs on trigger', () => {
    const mockStore = createMockStore({
      wallet: {
        state: {
          theme: 'light',
        },
      },
      rad: {
        state: {
          currentTemplate: {
            variables: [
              {
                description:
                  'Helps users of this template understand what this variable is used for',
                key: 'my_var_0',
                type: 'Boolean',
                value:
                  'The default String that this variable will take if an user does not override it',
              },
            ],
          },
        },
        getters: {
          variablesKeys: () => {},
        },
        mutations: {
          DELETE_VARIABLE: () => {},
          CREATE_VARIABLE: () => {},
          UPDATE_VARIABLES: () => {},
        },
      },
    })
    const wrapper = mount(Variables, {
      global: {
        plugins: [mockStore],
      },
      data() {
        return {
          errors: [],
          keys: ['my_var_0'],
        }
      },
    })

    test('should change the variable value when trigger', () => {
      wrapper.find('[data-test="edit-var-value-input"]').setValue('new_value')
      expect(
        wrapper.find('[data-test="edit-var-value-input"]').element.value,
      ).toEqual('new_value')
    })

    test('should change the variable description when trigger', () => {
      wrapper
        .find('[data-test="edit-var-description-input"]')
        .setValue('new_description')
      expect(
        wrapper.find('[data-test="edit-var-description-input"]').element.value,
      ).toEqual('new_description')
    })

    test('should change the variable description when trigger', () => {
      wrapper.find('[data-test="edit-var-input"]').setValue('new_key')
      expect(
        wrapper.find('[data-test="edit-var-input"]').element.value,
      ).toEqual('new_key')
    })
  })
})
