import * as api from "../../../app/renderer/new_api"

describe("Import Seed method", () => {
  it("should request Import method and return value", async () => {
    const params = {
      walletId: "Int",
      toAddress: Buffer.from([]),
      amount: 0,
      fee: 0,
      subject: "aa",
    }

    const handleResponseMockValue = {
      response: true,
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

    const expected = handleResponseMockValue

    const result = await api.sendVTT(mockClient, params)

    expect(mockClient.request).toBeCalledWith("sendVTT", params)
    expect(result).toEqual(expected)
  })
})
