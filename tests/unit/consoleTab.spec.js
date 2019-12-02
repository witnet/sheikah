import { shallowMount } from '@vue/test-utils'
import ConsoleTab from '@/components/ConsoleTab.vue'

describe('ConsoleTab.vue', () => {
  it('on click change initial tab', () => {
    const wrapper = shallowMount(ConsoleTab, {
      propsData: {
        initialTab: 'variables',
        showConsole: true,
      },
    })
    wrapper.setData({
      current: wrapper.props().initialTab,
      tabs: [{ name: 'variables' }, { name: 'logs' }],
    })
    expect(wrapper.vm.current).toBe('variables')
    expect(
      wrapper
        .findAll('button')
        .at(1)
        .trigger('click')
    )
    expect(wrapper.vm.current).toBe('logs')
    expect(
      wrapper
        .findAll('button')
        .at(0)
        .trigger('click')
    )
    expect(wrapper.vm.current).toBe('variables')
    expect(
      wrapper
        .findAll('button')
        .at(2)
        .trigger('click')
    )
    wrapper.vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
