import Address from '@/components/Address.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('Address.vue', () => {
  test('Should include the address passed', () => {
    const address = 'twit1h6877gejcje43725hznxfwh9ezm9qtqx8ukykf'
    const wrapper = mount(Address, {
      props: {
        value: address,
      },
    })

    const addressFound = wrapper.find('[data-test="address"]').text()

    expect(addressFound).toBe(address)
  })

  test('Should include the address cropped when blind is passed', () => {
    const address = 'twit1h6877gejcje43725hznxfwh9ezm9qtqx8ukykf'
    const wrapper = mount(Address, {
      props: {
        value: address,
        blind: true,
      },
    })

    const addressFound = wrapper.find('[data-test="address"]').text()

    expect(addressFound).toBe('twit1h6877gejcje43...fwh9ezm9qtqx8ukykf')
  })

  test('Should have default size of 14px when no size prop is passed', () => {
    const address = 'twit1h6877gejcje43725hznxfwh9ezm9qtqx8ukykf'
    const wrapper = mount(Address, {
      props: {
        value: address,
      },
    })

    const addressFound = wrapper
      .find('[data-test="address"]')
      .attributes().style
    expect(addressFound).toBe('font-size: 12px;')
  })

  test('Should set the size passed as prop', () => {
    const address = 'twit1h6877gejcje43725hznxfwh9ezm9qtqx8ukykf'
    const wrapper = mount(Address, {
      props: {
        value: address,
        size: '14px',
      },
    })

    const addressFound = wrapper
      .find('[data-test="address"]')
      .attributes().style

    expect(addressFound).toBe('font-size: 14px;')
  })
})
