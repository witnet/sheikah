import * as api from "../../../app/renderer/new_api"

describe("Run Data Request method", () =>
  it("should request runDataRequest method and return value", async () => {
    const params = {
      dataRequest: "Int",
    }

    const handleResponseMockValue = {
      runDataRequest: "Int",
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
    const result = await api.runDataRequest(mockClient, params)

    expect(mockClient.request).toBeCalledWith("runDataRequest", params)
    expect(result).toEqual(expected)
  })
)
