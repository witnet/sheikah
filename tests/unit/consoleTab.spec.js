import ConsoleTabs from '@/components/ConsoleTabs.vue'

// FIXME: update and move to the correct folder
describe.skip('ConsoleTabs.vue', () => {
  it('on click emit change-tab evnt', () => {
    const wrapper = shallowMount(ConsoleTabs, {
      propsData: {
        current: 'variables',
        showConsole: true,
      },
    })
    wrapper.setData({
      current: wrapper.props().current,
      tabs: ['variables', 'logs'],
    })
    expect(wrapper.vm.current).toBe('variables')
    expect(
      wrapper
        .findAll('button')
        .at(1)
        .trigger('click')
    )
    expect(wrapper.emitted()['change-tab'][0][0]).toEqual('logs')
  })
})
