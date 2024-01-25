import BalanceData from '@/components/BalanceData.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMockStore } from '../../utils'

describe('Balance.vue', () => {
  const mockStore = createMockStore({
    wallet: {
      state: {
        unit: 'nanoWits',
      },
    },
  })
  test('should render the available amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      global: {
        plugins: [mockStore],
      },
    })

    expect(wrapper.find('[data-test="available"]').exists()).toBe(true)
  })

  test('should render the locked amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      global: {
        plugins: [mockStore],
      },
    })

    expect(wrapper.find('[data-test="locked"]').exists()).toBe(true)
  })

  test('should render the total amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '0',
        total: '100',
        unit: 'nanoWits',
      },
      global: {
        plugins: [mockStore],
      },
    })
    expect(wrapper.find('[data-test="total"]').exists()).toBe(true)
  })

  test('should render the unconfirmed amount', () => {
    const wrapper = shallowMount(BalanceData, {
      props: {
        available: '1',
        locked: '10',
        unconfirmed: '10',
        total: '100',
        unit: 'nanoWits',
      },
      global: {
        plugins: [mockStore],
      },
    })
    expect(wrapper.find('[data-test="unconfirmed"]').exists()).toBe(true)
  })
})
