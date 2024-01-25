import ExportXprv from '@/components/ExportXprv.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { createMockStore } from '../../utils'

describe('ExportXprv', () => {
  const exportMasterKeyMock = vi.fn()
  const clearErrorMock = vi.fn()
  const validatePasswordMock = vi.fn()
  const mockStore = createMockStore({
    wallet: {
      state: {
        unit: 'nanoWit',
        xprv: 'x',
        validatedPassword: 'validatedPassword',
        errors: {
          createValidPassword: {
            message: 'createValidPassword',
          },
        },
      },
      actions: {
        exportMasterKey: exportMasterKeyMock,
      },
      mutations: {
        validatePassword: validatePasswordMock,
        clearError: clearErrorMock,
      },
    },
  })

  const wrapper = mount(ExportXprv, {
    global: {
      plugins: [i18n, mockStore],
    },
  })

  test('shows an error when the password is not validated', async () => {
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="repeated-password"]').setValue('passwo')

    await wrapper.find('[data-test="export-btn"]').trigger('click')

    expect(wrapper.find('[data-test="password-error-alert"]').text()).toBe(
      `createValidPassword`,
    )
  })

  test('calls the validate password and export masterkey actions', async () => {
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="repeated-password"]').setValue('password')

    await wrapper.find('[data-test="export-btn"]').trigger('click')

    expect(validatePasswordMock).toHaveBeenCalled()
    expect(exportMasterKeyMock).toHaveBeenCalled()
  })
})
