import EditorSource from '@/components/EditorSource.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'
import { ElFormItem, ElInput } from 'element-plus'

describe('EditorSource.vue', () => {
  const mockStore = createMocks({
    storeModules: {
      wallet: { state: { theme: 'light' } },
    },
    stubs: {
      CustomIcon: true,
      'el-form-item': ElFormItem,
      'el-input': ElInput,
    },
  })
  describe('should render correctly', () => {
    test('should contains a the title', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: '',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.title').text('Data Source #0'))
    })

    test('it should NOT contain subtitle if NO url', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: '',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    test('it should NOT contain subtitle if NO valid url', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: '',
          url: 'witnet.abcdefghij',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(false)
    })

    test('it should contains subtitle if a valid url', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('.subtitle').exists()).toBe(true)
    })

    test('should contains protocol select field', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    test('should contains url input field', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: '',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="protocol-select"]').exists()).toBe(true)
    })

    test('should contain content-type select field', () => {
      const wrapper = mount(EditorSource, {
        ...mockStore,
        props: {
          index: 0,
          headers: '{}',
          body: '{}',
          protocol: 'HTTP-GET',
          url: 'www.witnet.io',
          contentType: 'JSON API',
          kindOptions: ['HTTP-GET', 'RNG'],
          contentTypeOptions: { http: 'JSON API', rng: 'Bytes' },
        },
      })

      expect(wrapper.find('[data-test="content-type-select"]').exists()).toBe(
        true,
      )
    })
  })

  // FIXME: add test checking source update is called
  // FIXME: add test checking the source is delete on cross click
})
