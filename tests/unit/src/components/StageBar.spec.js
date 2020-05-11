import EditorStageBar from '@/components/EditorStageBar'
describe('EditorStageBar.vue', () => {
  describe('should render properly', () => {
    const wrapper = shallowMount(EditorStageBar, {
      propsData: {
        initialStage: 'settings',
      },
    })

    it('should render the settings stage btn', () => {
      expect(wrapper.find('[data-test="stage-settings"]').text()).toBe('1. Enter Template Settings')
    })

    it('should render the sources stage btn', () => {
      expect(wrapper.find('[data-test="stage-sources"]').text()).toBe('2. Select your Data Sources')
    })

    it('should render the scripts stage btn', () => {
      expect(wrapper.find('[data-test="stage-scripts"]').text()).toBe('3. Edit Source Scripts')
    })

    it('should render the aggregations stage btn', () => {
      expect(wrapper.find('[data-test="stage-aggregations"]').text()).toBe('4. Set Aggregator')
    })

    it('should render the tally stage', () => {
      expect(wrapper.find('[data-test="stage-tally"]').text()).toBe('5. Set Tally')
    })
  })
})
