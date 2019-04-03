import * as api from "../../../app/renderer/new_api"

describe("sayHello Api method", () => {
  it("should request say_hello method and return value", async () => {
    const expected = { name: "name" }
    const mockClient = {
      withOptions: jest.fn((opts: Partial<api.Options>) => api.Client),
      notify: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { }),
      /* eslint-disable no-new */
      request: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) })
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(expected))),
      subscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
      unsubscribe: jest.fn((method: api.ApiMethod, args: api.MethodArgs) => { new Promise(() => {}) }),
    }

    const args = {
      name: "name",
    }

    const result = await api.sayHello(mockClient, args)

    expect(mockClient.request).toBeCalledWith("say_hello", args)
    expect(result).toEqual(expected)
  })
})
