import { shallowMount } from '@vue/test-utils'
import Import from '@/components/Import.vue'
import { validateClaimingImportFile } from '@/utils'
import '../../src/fontAwesome'

describe('Import.vue', () => {
  it('on click emit change-tab evnt', () => {
    const wrapper = shallowMount(Import, {
      propsData: {
        acceptedFormat: '.json',
        // wallet state
        error: String,
        // wallet state
        file: Object,
        // wallet function
        clearFile: Function,
        validateFile: validateClaimingImportFile,
        // wallet function
        saveFileInfo: Function,
      },
    })
    wrapper.setData({
      showDelete: false,
    })
  })
})
