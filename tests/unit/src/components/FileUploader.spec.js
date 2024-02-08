import { shallowMount, mount } from '@vue/test-utils'
import FileUploader from '@/components/FileUploader.vue'
import claimingFileSuccess from '@/TemplateExample.json'

import '../../../../src/fontAwesome'

describe('Renders the correct elements when there is no file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    props: {
      acceptedFormat: '.json',
      errorMessage: null,
      file: null,
      validateFile: () => {},
    },
    ...createMocks(),
  })
  wrapper.setData({
    showDelete: false,
  })
  test('finds the drag-and-drop element', () => {
    expect(wrapper.find('[data-test="drag-and-drop"]').exists()).toBe(true)
  })
  test('does not find the upload-text element', () => {
    expect(wrapper.find('[data-test="upload-text"]').exists()).toBe(true)
  })
  test('does not find the upload-icon element', () => {
    expect(wrapper.find('[data-test="upload-icon"]').exists()).toBe(true)
  })
  test('finds the success-text element', () => {
    expect(wrapper.find('[data-test="success-text"]').exists()).toBe(false)
  })
  test('finds the success-icon element', () => {
    expect(wrapper.find('[data-test="success-icon"]').exists()).toBe(false)
  })
  test('finds the accepted-file-subtitle element', () => {
    expect(wrapper.find('[data-test="accepted-file-subtitle"]').exists()).toBe(
      true,
    )
  })
  test('finds the file-name element', () => {
    expect(wrapper.find('[data-test="file-name"]').exists()).toBe(false)
  })
  test('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(false)
  })
  test('finds the check-icon" element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(false)
  })
  test('does not find the error" element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
  })
})

describe('Renders the correct elements when there is a file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    props: {
      acceptedFormat: '.json',
      errorMessage: null,
      file: claimingFileSuccess,
      validateFile: () => {},
    },
    ...createMocks(),
  })
  wrapper.setData({
    showDelete: false,
  })
  test('finds the drag-and-drop element', () => {
    expect(wrapper.find('[data-test="drag-and-drop"]').exists()).toBe(true)
  })
  test('does not find the upload-text element', () => {
    expect(wrapper.find('[data-test="upload-text"]').exists()).toBe(false)
  })
  test('does not find the upload-icon element', () => {
    expect(wrapper.find('[data-test="upload-icon"]').exists()).toBe(false)
  })
  test('finds the success-text element', () => {
    expect(wrapper.find('[data-test="success-text"]').exists()).toBe(true)
  })
  test('finds the success-icon element', () => {
    expect(wrapper.find('[data-test="success-icon"]').exists()).toBe(true)
  })
  test('finds the accepted-file-subtitle element', () => {
    expect(wrapper.find('[data-test="accepted-file-subtitle"]').exists()).toBe(
      true,
    )
  })
  test('finds the file-name element', () => {
    expect(wrapper.find('[data-test="file-name"]').exists()).toBe(true)
  })
  test('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(false)
  })
  test('finds the check-icon" element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(true)
  })
  test('does not find the error" element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
  })
})

describe('Shows delete file button when showDelete is activated', () => {
  const wrapper = shallowMount(FileUploader, {
    props: {
      acceptedFormat: '.json',
      errorMessage: null,
      file: claimingFileSuccess,
      validateFile: () => {},
    },
    ...createMocks(),
  })
  wrapper.setData({
    showDelete: true,
  })
  test('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(true)
  })
  test('finds the check-icon" element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(false)
  })
})

describe('Upload file', () => {
  test('uploads a file', async () => {
    let localImageInputValue = ''

    const wrapper = shallowMount(FileUploader, {
      props: {
        acceptedFormat: '.json',
        errorMessage: null,
        file: undefined,
        validateFile: () => true,
      },
      ...createMocks(),
    })

    const localImageInput = wrapper.find('input[type="file"]')
    const localImageInputFilesGet = vi.fn()
    const localImageInputValueGet = vi
      .fn()
      .mockReturnValue(localImageInputValue)
    const localImageInputValueSet = vi.fn().mockImplementation(v => {
      localImageInputValue = v
    })
    Object.defineProperty(localImageInput.element, 'files', {
      get: localImageInputFilesGet,
    })

    Object.defineProperty(localImageInput.element, 'value', {
      get: localImageInputValueGet,
      set: localImageInputValueSet,
    })

    localImageInputFilesGet.mockReturnValue([
      new Blob([JSON.stringify(claimingFileSuccess)], {
        type: 'application/json',
      }),
    ])

    await localImageInput.trigger('change')

    // await until file is loaded
    await new Promise(resolve => {
      setTimeout(() => {
        expect(wrapper.vm.$data.localFile).toBeTruthy()
        resolve()
      }, 2000)
    })
  })
})
describe('delete file when click on delete', () => {
  const wrapper = mount(FileUploader, {
    ...createMocks(),
  })

  wrapper.setData({
    showDelete: false,
    localFile: {},
  })

  test('finds file element', () => {
    expect(wrapper.find('[data-test="file"]').exists()).toBe(true)
  })
  test('triggers mouseover', () => {
    expect(wrapper.find('[data-test="file"]').trigger('mouseover'))
  })
  test('deletes file', () => {
    expect(wrapper.vm.$data.showDelete).toBe(true)
  })
  test('triggers click', () => {
    expect(wrapper.find('[data-test="delete-icon"]').trigger('click'))
  })
  test('deletes localFile', () => {
    expect(wrapper.vm.$data.localFile).toBe(null)
  })
})
describe('show error when error', () => {
  const wrapper = shallowMount(FileUploader, {
    props: {
      acceptedFormat: '.json',
      errorMessage: 'An error',
      file: undefined,
      validateFile: () => false,
    },
    ...createMocks(),
  })

  wrapper.setData({
    error: true,
  })

  test('does not find the error" element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true)
  })
  test('does not find the error" element', () => {
    expect(wrapper.find('[data-test="icon-error"]').exists()).toBe(true)
  })
})
