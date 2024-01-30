import ScriptInfo from '@/components/ScriptInfo.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { createMocks } from '../../utils'

describe('ScriptInfo.vue', () => {
  describe('should render correctly', () => {
    const wrapper = shallowMount(ScriptInfo, {
      props: {
        index: 0,
        info: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      },
      ...createMocks(),
    })

    test('finds the index', () => {
      expect(wrapper.find('[data-test="index"]').text()).toBe('1.')
    })

    test('finds the description', () => {
      expect(wrapper.find('[data-test="description"]').text()).toBe(
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      )
    })
  })
})
