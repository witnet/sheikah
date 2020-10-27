import { shallowMount, mount } from '@vue/test-utils'
import FileUploader from '@/components/FileUploader.vue'
// eslint-disable-next-line import/no-relative-parent-imports
import claimingFileSuccess from '../../../../claiming_file_success'
// eslint-disable-next-line import/no-relative-parent-imports
import '../../../../src/fontAwesome'

describe('Renders the correct elements when there is no file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload a valid file',
      file: null,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: false,
  })

  it('finds the drag-and-drop element', () => {
    expect(wrapper.find('[data-test="drag-and-drop"]').exists()).toBe(true)
  })

  it('does not find the upload-text element', () => {
    expect(wrapper.find('[data-test="upload-text"]').exists()).toBe(true)
  })

  it('does not find the upload-icon element', () => {
    expect(wrapper.find('[data-test="upload-icon"]').exists()).toBe(true)
  })

  it('finds the success-text element', () => {
    expect(wrapper.find('[data-test="success-text"]').exists()).toBe(false)
  })

  it('finds the success-icon element', () => {
    expect(wrapper.find('[data-test="success-icon"]').exists()).toBe(false)
  })

  it('finds the accepted-file-subtitle element', () => {
    expect(wrapper.find('[data-test="accepted-file-subtitle"]').exists()).toBe(
      true,
    )
  })

  it('finds the file-name element', () => {
    expect(wrapper.find('[data-test="file-name"]').exists()).toBe(false)
  })

  it('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(false)
  })

  it('finds the check-icon element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(false)
  })

  it('does not find the error element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
  })
})

describe('Renders the correct elements when there is a file uploaded', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload valid file',
      file: claimingFileSuccess,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: false,
  })

  it('finds the drag-and-drop element', () => {
    expect(wrapper.find('[data-test="drag-and-drop"]').exists()).toBe(true)
  })

  it('does not find the upload-text element', () => {
    expect(wrapper.find('[data-test="upload-text"]').exists()).toBe(false)
  })

  it('does not find the upload-icon element', () => {
    expect(wrapper.find('[data-test="upload-icon"]').exists()).toBe(false)
  })

  it('finds the success-text element', () => {
    expect(wrapper.find('[data-test="success-text"]').exists()).toBe(true)
  })

  it('finds the success-icon element', () => {
    expect(wrapper.find('[data-test="success-icon"]').exists()).toBe(true)
  })

  it('finds the accepted-file-subtitle element', () => {
    expect(wrapper.find('[data-test="accepted-file-subtitle"]').exists()).toBe(
      true,
    )
  })

  it('finds the file-name element', () => {
    expect(wrapper.find('[data-test="file-name"]').exists()).toBe(true)
  })

  it('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(false)
  })

  it('finds the check-icon element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(true)
  })

  it('does not find the error element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false)
  })
})

describe('Shows delete file button when showDelete is activated', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'upload a valid file',
      file: claimingFileSuccess,
      validateFile: () => {},
    },
  })
  wrapper.setData({
    showDelete: true,
  })

  it('does not find the delete-icon element', () => {
    expect(wrapper.find('[data-test="delete-icon"]').exists()).toBe(true)
  })

  it('finds the check-icon element', () => {
    expect(wrapper.find('[data-test="check-icon"]').exists()).toBe(false)
  })
})

describe('Upload file', () => {
  it('uploads a file', async () => {
    let localImageInputValue = ''

    const wrapper = shallowMount(FileUploader, {
      propsData: {
        acceptedFormat: '.json',
        errorMessage: 'An error',
        file: undefined,
        validateFile: () => true,
      },
    })

    const localImageInput = wrapper.find('input[type="file"]')
    const localImageInputFilesGet = jest.fn()
    const localImageInputValueGet = jest
      .fn()
      .mockReturnValue(localImageInputValue)
    const localImageInputValueSet = jest.fn().mockImplementation(v => {
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

    localImageInput.trigger('change')
  })
})
describe('delete file when click on delete', () => {
  const wrapper = mount(FileUploader)

  wrapper.setData({
    showDelete: false,
    localFile: {},
  })

  it('finds file element', () => {
    expect(wrapper.find('[data-test="file"]').exists()).toBe(true)
  })

  it('triggers mouseover', () => {
    expect(wrapper.find('[data-test="file"]').trigger('mouseover'))
  })

  it('deletes file', () => {
    expect(wrapper.vm.$data.showDelete).toBe(true)
  })

  it('triggers click', () => {
    expect(wrapper.find('[data-test="delete-icon"]').trigger('click'))
  })

  it('deletes localFile', () => {
    expect(wrapper.vm.$data.localFile).toBe(null)
  })
})
describe('show error when error', () => {
  const wrapper = shallowMount(FileUploader, {
    propsData: {
      acceptedFormat: '.json',
      errorMessage: 'An error',
      file: undefined,
      validateFile: () => false,
    },
  })

  wrapper.setData({
    error: true,
  })

  it('does not find the error element', () => {
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true)
  })

  it('does not find the error element', () => {
    expect(wrapper.find('[data-test="icon-error"]').exists()).toBe(true)
  })
})
