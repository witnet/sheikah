import Tag from '@/components/Tag'

describe('Tag.vue', () => {
  it('should render the content passed by props', () => {
    const wrapper = shallowMount(Tag, {
      propsData: {
        color: 'green',
        text: 'SUCCESS',
      },
    })

    expect(wrapper.find('.tag').text()).toBe('SUCCESS')
  })

  it('should contain the color class', () => {
    const wrapper = shallowMount(Tag, {
      propsData: {
        color: 'red',
        text: 'SUCCESS',
      },
    })

    expect(wrapper.find('.tag').classes('red')).toBe(true)
  })
})
