import * as api from "../../../app/renderer/new_api"

describe("Import Seed method", () => {
  it("should request Import method and return value", async () => {
    const params = {
      walletId: "Int",
      wipe: true,
    }

    const handleResponseMockValue = {
      wipe: false,
    }

    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(handleResponseMockValue))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const expected = handleResponseMockValue.wipe

    const result = await api.lockWallet(mockClient, params)

    expect(mockClient.request).toBeCalledWith("lockWallet", params)
    expect(result).toEqual(expected)
  })
})
