import RenameTemplate from '@/components/RenameTemplate.vue'

describe('RadonOperator.vue', () => {
  describe('should render properly the rename template form', () => {
    const wrapper = mount(RenameTemplate, {
      ...createComponentMocks({
        store: {
          rad: {
            mutations: {
              renameTemplate: () => {},
              updateTemplateDescription: () => {},
              clearCurrentFocus: () => {},
            },
          },
        },
      }),
      propsData: {
        name: 'Name',
        description: 'Description',
        id: 'c45ad887-4dcd-453a-aa1b-e2d4d52a7a96',
      },
    })

    it('should render the name label', () => {
      expect(wrapper.find('[data-test="name-label"]').text()).toEqual('Name')
    })

    it('should render the placeholder', () => {
      expect(
        wrapper.find('[data-test="template-name-input"]').element.value,
      ).toEqual('Name')
    })

    it('should change the template name when trigger', () => {
      wrapper.find('[data-test="template-name-input"]').setValue('some value')
      expect(
        wrapper.find('[data-test="template-name-input"]').element.value,
      ).toEqual('some value')
    })

    it('should render the description label', () => {
      expect(wrapper.find('[data-test="description-label"]').text()).toEqual(
        'Description',
      )
    })

    it('should render the placeholder', () => {
      expect(
        wrapper.find('[data-test="template-description-input"]').element.value,
      ).toEqual('Description')
    })

    it('should should change the description name when trigger', () => {
      wrapper
        .find('[data-test="template-description-input"]')
        .setValue('some description')
      expect(
        wrapper.find('[data-test="template-description-input"]').element.value,
      ).toEqual('some description')
    })
  })
})
