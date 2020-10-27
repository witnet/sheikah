import ScriptInfo from '@/components/ScriptInfo.vue'

describe('ScriptInfo.vue', () => {
  describe('should render correctly', () => {
    const wrapper = shallowMount(ScriptInfo, {
      propsData: {
        index: 0,
        info:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
    })

    it('finds the index', () => {
      expect(wrapper.find('[data-test="index"]').text()).toBe('1.')
    })

    it('finds the description', () => {
      expect(wrapper.find('[data-test="description"]').text()).toBe(
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      )
    })
  })
})
