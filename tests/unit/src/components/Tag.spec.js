import Tag from '@/components/Tag.vue'

describe('Tag.vue', () => {
  test('should render the content passed by props', () => {
    const wrapper = shallowMount(Tag, {
      props: {
        color: 'green',
        text: 'SUCCESS',
      },
      ...createMocks(),
    })

    expect(wrapper.find('.tag').text()).toBe('SUCCESS')
  })

  test('should contain the color class', () => {
    const wrapper = shallowMount(Tag, {
      props: {
        color: 'red',
        text: 'SUCCESS',
      },
      ...createMocks(),
    })

    expect(wrapper.find('.tag').classes('red')).toBe(true)
  })
})
