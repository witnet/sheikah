import ExportXprv from '@/components/ExportXprv.vue'

describe('ExportXprv', () => {
  const exportMasterKeyMock = jest.fn()
  const clearErrorMock = jest.fn()
  const validatePasswordMock = jest.fn()
  const showExportXprvQrVisibleMock = jest.fn()

  const wrapper = mount(ExportXprv, {
    ...createComponentMocks({
      store: {
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
            showExportXprvQrVisible: showExportXprvQrVisibleMock,
          },
        },
      },
    }),
  })

  it('shows an error when the password is not validated', async () => {
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="repeated-password"]').setValue('passwo')

    await wrapper.find('[data-test="export-btn"]').trigger('click')

    expect(wrapper.find('[data-test="password-error-alert"]').text()).toBe(
      `createValidPassword`,
    )
  })

  it('calls the validate password and export masterkey actions', async () => {
    wrapper.find('[data-test="password"]').setValue('password')
    wrapper.find('[data-test="repeated-password"]').setValue('password')

    await wrapper.find('[data-test="export-btn"]').trigger('click')

    expect(validatePasswordMock).toHaveBeenCalled()
    expect(exportMasterKeyMock).toHaveBeenCalled()
  })
})
