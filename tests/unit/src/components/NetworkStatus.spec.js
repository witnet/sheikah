import { shallowMount } from '@vue/test-utils'
import NetworkStatus from '@/components/NetworkStatus.vue'
import '@/fontAwesome'

// TODO: delete skip in tests when witnet/witnet-rust#1224 is merged
describe.skip('Renders the correct elements when wallet is synced, side bar is expanded but showAll is off', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: {
        progress: 70,
        synced: true,
      },
    },
  })
  wrapper.setData({
    showAll: false,
  })

  it('does not find detail info if the showAll is not triggered', () => {
    expect(wrapper.find('[data-test="detail-info"]').exists()).toBe(false)
  })

  it('finds data test dot indicator', () => {
    expect(wrapper.find('[data-test="dot-indicator"]').exists()).toBe(true)
  })

  it('finds wallet name', () => {
    expect(wrapper.find('[data-test="wallet-name"]').text()).toBe(
      'Witnet wallet #1',
    )
  })

  it('finds node status', () => {
    expect(
      wrapper
        .find('[data-test="status"]')
        .text()
        .exists(),
    ).toBe('SYNCED')
  })

  it('does not find loading spinner', () => {
    expect(wrapper.find('[data-test="loading-spinner"]'.exists())).toBe(false)
  })

  it('does not find loading spinner', () => {
    expect(wrapper.find('[data-test="loading-spinner"]').exists()).toBe(false)
  })

  it('finds icon short-down', () => {
    expect(wrapper.find('[data-test="short-down"]').exists()).toBe(true)
  })

  it('does not find icon short-up', () => {
    expect(wrapper.find('[data-test="short-up"]').exists()).toBe(false)
  })
})
// TODO: delete skip in tests when witnet/witnet-rust#1224 is merged
describe.skip('Renders the correct elements when wallet is synced, side bar is expanded and showAll is on', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: {
        synced: true,
        node: {
          address: '127.0.0.1:21337',
          last_beacon: {
            checkpoint: '123456789',
          },
          network: 'Testnet',
        },
      },
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
  })

  it('finds detail info if showAll is triggered', () => {
    expect(wrapper.find('[data-test="detail-info"]').exists()).toBe(true)
  })

  it('finds data test dot indicator', () => {
    expect(wrapper.find('[data-test="dot-indicator"]').exists()).toBe(true)
  })

  it('finds wallet name', () => {
    expect(wrapper.find('[data-test="wallet-name"]').exists()).toBe(true)
  })

  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('SYNCED')
  })

  it('does not find loading spinner', () => {
    expect(wrapper.find('[data-test="loading-spinner"]').exists()).toBe(false)
  })

  it('does not find icon short-down', () => {
    expect(wrapper.find('[data-test="short-down"]').exists()).toBe(false)
  })

  it('finds icon short-up', () => {
    expect(wrapper.find('[data-test="short-up"]').exists()).toBe(true)
  })

  it('finds icon node', () => {
    expect(wrapper.find('[data-test="node"]').text()).toBe(
      'Connected to 127.0.0.1:21337',
    )
  })

  it('finds icon last block', () => {
    expect(wrapper.find('[data-test="last-block"]').text()).toBe(
      'Last block is #123456789',
    )
  })

  it('finds network element', () => {
    expect(wrapper.find('[data-test="network"]').text()).toBe(
      'Tracking Testnet network',
    )
  })
})
// TODO: delete skip in tests when witnet/witnet-rust#1224 is merged
describe.skip('Renders the correct elements when the while syncing', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: {
        synced: false,
        progress: 70,
      },
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: true,
  })

  it('does not find loading spinner', () => {
    expect(wrapper.find('[data-test="loading-spinner"]').exists()).toBe(true)
  })

  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('SYNCING (70%)')
  })
})
// TODO: delete skip in tests when witnet/witnet-rust#1224 is merged
describe.skip('Renders the correct elements when the status is unknown', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: null,
    },
  })
  wrapper.setData({
    showAll: false,
    loading: true,
  })

  it('does not find loading spinner', () => {
    expect(wrapper.find('[data-test="loading-spinner"]').exists()).toBe(true)
  })

  it('finds icon short-down', () => {
    expect(wrapper.find('[data-test="short-down"]').exists()).toBe(true)
  })

  it('does not find icon short-up', () => {
    expect(wrapper.find('[data-test="short-up"]').exists()).toBe(false)
  })

  it('does not find detail info if the showAll is not triggered', () => {
    expect(wrapper.find('[data-test="detail-info"]').exists()).toBe(false)
  })
})
