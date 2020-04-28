import { shallowMount } from '@vue/test-utils'
import NetworkStatus from '@/components/NetworkStatus.vue'
import '../../../../src/fontAwesome'

describe('Renders the correct elements when side bar is expanded but the click is not triggered', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'Block',
      node: 'node',
      network: 'Testnet',
      lastBlock: 'last block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: false,
    loading: false,
  })
  it('does not find detail info if the showAll is not triggered', () => {
    expect(wrapper.contains('[data-test="detail-info"]')).toBe(false)
  })
  it('finds data test dot indicator', () => {
    expect(wrapper.contains('[data-test="dot-indicator"]')).toBe(true)
  })
  it('finds wallet name', () => {
    expect(wrapper.find('[data-test="wallet-name"]').text()).toBe('Witnet wallet #1')
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('BLOCK')
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('finds icon short-down', () => {
    expect(wrapper.contains('[data-test="short-down"]')).toBe(true)
  })
  it('does not find icon short-up', () => {
    expect(wrapper.contains('[data-test="short-up"]')).toBe(false)
  })
})

describe('Renders the correct elements when side bar is expanded, the click is triggered and data loaded', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      network: 'Testnet',
      status: 'Block',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: false,
  })
  it('does not find detail info if the showAll is not triggered', () => {
    expect(wrapper.contains('[data-test="detail-info"]')).toBe(true)
  })
  it('finds data test dot indicator', () => {
    expect(wrapper.contains('[data-test="dot-indicator"]')).toBe(true)
  })
  it('finds wallet name', () => {
    expect(wrapper.contains('[data-test="wallet-name"]')).toBe(true)
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('BLOCK')
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('does not find icon short-down', () => {
    expect(wrapper.contains('[data-test="short-down"]')).toBe(false)
  })
  it('finds icon short-up', () => {
    expect(wrapper.contains('[data-test="short-up"]')).toBe(true)
  })
  it('finds icon node', () => {
    expect(wrapper.find('[data-test="node"]').text()).toBe('Connected to  node')
  })
  it('finds icon last block', () => {
    expect(wrapper.find('[data-test="last-block"]').text()).toBe('Last block is  #last-block  ()')
  })
  it('finds network element', () => {
    expect(wrapper.find('[data-test="network"]').text()).toBe('Tracking  Testnet  network')
  })
})

describe('Renders the correct elements when side bar is expanded, the click is triggered and data loaded', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'Block',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: false,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
})

describe('Renders the correct elements when the status is SyncFinished', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'SyncFinish',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: false,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('SYNC FINISHED')
  })
})

describe('Renders the correct elements when the status is movement', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'Movement',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: false,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(false)
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('MOVEMENT')
  })
})

describe('Renders the correct elements when the status is sync start', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'SyncStart',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: true,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(true)
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('SYNC START')
  })
})

describe('Renders the correct elements when the status is Sync in progress', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'SyncProgress',
      node: 'node',
      lastBlock: 'last-block',
      walletIdx: 1,
    },
  })
  wrapper.setData({
    showAll: true,
    loading: true,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(true)
  })
  it('finds node status', () => {
    expect(wrapper.find('[data-test="status"]').text()).toBe('SYNC IN PROGRESS')
  })
})

describe('Renders the correct elements when the status is unknown', () => {
  const wrapper = shallowMount(NetworkStatus, {
    propsData: {
      expanded: true,
      status: 'Unknown',
    },
  })
  wrapper.setData({
    showAll: false,
    loading: true,
  })
  it('does not find loading spinner', () => {
    expect(wrapper.contains('[data-test="loading-spinner"]')).toBe(true)
  })
  it('does not find icon short-down', () => {
    expect(wrapper.contains('[data-test="short-down"]')).toBe(false)
  })
  it('finds icon short-up', () => {
    expect(wrapper.contains('[data-test="short-up"]')).toBe(false)
  })
  it('does not find detail info if the showAll is not triggered', () => {
    expect(wrapper.contains('[data-test="detail-info"]')).toBe(false)
  })
})
