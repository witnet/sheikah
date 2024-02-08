import RenameTemplate from '@/components/RenameTemplate.vue'

import { ElInput } from 'element-plus'

describe('RadonOperator.vue', () => {
  describe('should render properly the rename template form', () => {
    const mockStore = createMocks({
      storeModules: {
        rad: {
          mutations: {
            renameTemplate: () => {},
            updateTemplateDescription: () => {},
            clearCurrentFocus: () => {},
          },
        },
      },
      stubs: {
        'el-input': ElInput,
      },
    })
    const wrapper = mount(RenameTemplate, {
      ...mockStore,
      props: {
        name: 'Name',
        description: 'Description',
        id: 'c45ad887-4dcd-453a-aa1b-e2d4d52a7a96',
      },
    })

    test('should render the name label', () => {
      expect(wrapper.find('[data-test="name-label"]').text()).toEqual('Name')
    })

    test('should render the placeholder', () => {
      expect(
        wrapper.find('[data-test="template-name-input"]').element.value,
      ).toEqual('Name')
    })

    test('should change the template name when trigger', () => {
      wrapper.find('[data-test="template-name-input"]').setValue('some value')
      expect(
        wrapper.find('[data-test="template-name-input"]').element.value,
      ).toEqual('some value')
    })

    test('should render the description label', () => {
      expect(wrapper.find('[data-test="description-label"]').text()).toEqual(
        'Description',
      )
    })

    test('should render the placeholder', () => {
      expect(
        wrapper.find('[data-test="template-description-input"]').element.value,
      ).toEqual('Description')
    })

    test('should should change the description name when trigger', () => {
      wrapper
        .find('[data-test="template-description-input"]')
        .setValue('some description')
      expect(
        wrapper.find('[data-test="template-description-input"]').element.value,
      ).toEqual('some description')
    })
  })
})
